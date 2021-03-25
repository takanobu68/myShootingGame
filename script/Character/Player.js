import { CharacterBase } from "../common/CharacterBase.js";
import { Vector2 } from "../common/Vector2.js";

export class Player extends CharacterBase {
  constructor(ctx, x, y, w, h, imagePath) {
    super(ctx, x, y, w, h, 0, imagePath);

    this.isComing = false;

    this.comingStart = null;

    this.comingStartPosition = null;

    this.comingEndPosition = null;

    this.speed = 3;

    this.shotArray = null;

    this.slantingShotArray = null;

    this.shotCheckCounter = 0;

    this.shotInterval = 10;
  }

  setComing(startX, startY, endX, endY) {
    this.isComing = true;
    this.comingStart = Date.now();
    this.position.set(startX, startY);
    this.comingStartPosition = new Vector2(startX, startY);
    this.comingEndPosition = new Vector2(endX, endY);
  }

  setShotArray(shotArray, slantingShotArray) {
    this.shotArray = shotArray;
    this.slantingShotArray = slantingShotArray;
  }

  update() {
    // 現時点のタイムスタンプを取得する
    let justTime = Date.now();

    // 登場シーンの処理
    if (this.isComing) {
      // 登場シーンが始まってからの経過時間
      let comingTime = (justTime - this.comingStart) / 1000;
      // 登場中は時間が経つほど上に進む
      let y = this.comingStartPosition.y - comingTime * 50;
      // 一定の位置まで移動したら登場シーンを終了する
      if (y <= this.comingEndPosition.y) {
        this.isComing = false; // 登場シーンフラグを下す
        y = this.comingEndPosition.y; // 行き過ぎの可能性もあるので位置を再設定
      }
      // 求めたY座標を自機に設定する
      this.position.set(this.position.x, y);
      // 自機の登場演出時には点滅させる
      if (justTime % 100 < 50) {
        this.ctx.globalAlpha = 0.5;
      }
    } else {
      // キーの押下状態を調べて挙動を変える
      if (isKeyDown.key_ArrowLeft === true) {
        this.position.x -= this.speed; // アローキーの左
      }
      if (isKeyDown.key_ArrowRight === true) {
        this.position.x += this.speed; // アローキーの右
      }
      if (isKeyDown.key_ArrowUp === true) {
        this.position.y -= this.speed; // アローキーの上
      }
      if (isKeyDown.key_ArrowDown === true) {
        this.position.y += this.speed; // アローキーの下
      }

      // 移動後の位置が画面外へ出ていないか確認して修正する
      let canvasWidth = this.ctx.canvas.width;
      let canvasHeight = this.ctx.canvas.height;
      let tx = Math.min(Math.max(this.position.x, 0), canvasWidth);
      let ty = Math.min(Math.max(this.position.y, 0), canvasHeight);
      this.position.set(tx, ty);

      // キーの押下状態を調べてショットを生成する
      if (window.isKeyDown.key_z) {
        if (this.shotCheckCounter >= 0) {
          // ショットの配列を確認し、lifeが0のものがあれば
          // 1にすることで画面に表示させる
          for (let i = 0; i < this.shotArray.length; ++i) {
            // まだ生成されていない物を生成する
            if (this.shotArray[i].life <= 0) {
              // 自機キャラクターの位置にショットを生成する
              this.shotArray[i].set(this.position.x, this.position.y);
              // ショットを生成したのでインターバルを設定する
              this.shotCheckCounter = -this.shotInterval;
              // 1つ生成したら、ループを抜ける
              break;
            }
          }
          // 斜め方向のショットの生存を確認して非生存なら生成
          for (let j = 0; j < this.slantingShotArray.length; j += 2) {
            if (
              this.slantingShotArray[j].life <= 0 &&
              this.slantingShotArray[j + 1].life <= 0
            ) {
              this.slantingShotArray[j].set(this.position.x, this.position.y);
              this.slantingShotArray[j].setVector(0.2, -0.9);
              this.slantingShotArray[j + 1].set(
                this.position.x,
                this.position.y
              );
              this.slantingShotArray[j + 1].setVector(-0.2, -0.9);
              this.shotCheckCounter = -this.shotInterval;
              break;
            }
          }
        }
      }
      ++this.shotCheckCounter;
    }

    // 自機キャラクターを描画する
    this.draw();

    // 念のためグローバルなアルファの状態を元に戻す
    this.ctx.globalAlpha = 1.0;
  }
}
