import { CharacterBase } from "../common/CharacterBase.js";
import { Position } from "../common/Position.js";

export class Player extends CharacterBase {
  constructor(ctx, x, y, w, h, image) {
    super(ctx, x, y, w, h, 0, image);

    this.isComing = false;

    this.comingStart = null;

    this.comingStartPosition = null;

    this.comingEndPosition = null;
  }

  setComing(startX, startY, endX, endY) {
    this.isComing = true;
    this.comingStart = Date.now();
    this.position.set(startX, startY);
    this.comingStartPosition = new Position(startX, startY);
    this.comingEndPosition = new Position(endX, endY);
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
    }

    // 自機キャラクターを描画する
    this.draw();

    // 念のためグローバルなアルファの状態を元に戻す
    this.ctx.globalAlpha = 1.0;
  }
}
