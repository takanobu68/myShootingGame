import { Vector2 } from "../common/Vector2.js";
import { CharacterBase } from "../common/CharacterBase.js";

export class Enemy extends CharacterBase {
  constructor(ctx, x, y, w, h, imagePath) {
    super(ctx, x, y, w, h, 0, imagePath);

    this.type = "default";

    this.frame = 0; // 間隔調整を行う為に使用

    this.speed = 3;

    this.shotArray = null;

    /**
     * 攻撃の対象とするインスタンス
     * @type{Character}
     */
    this.attackTarget = null;
  }

  set(x, y, life = 1, type = "default") {
    this.position.set(x, y);
    this.life = life;
    this.type = type;
    this.frame = 0;
  }

  setShotArray(shotArray) {
    this.shotArray = shotArray;
  }

  /**
   * 攻撃対象を設定する
   * @param {Charactor} target 自身が攻撃対象とするインスタンス
   */
  setAttackTarget(target) {
    // 自身のプロパティに設定する
    this.attackTarget = target;
  }

  fire(x = 0.0, y = 1.0) {
    // ショットの生存を確認し非生存の物があれば生成する
    for (let i = 0; i < this.shotArray.length; ++i) {
      // 非生存かどうか確認する
      if (this.shotArray[i].life <= 0) {
        // 敵キャラクターの座標にショットを生成する
        this.shotArray[i].set(this.position.x, this.position.y);
        // ショットのスピードを設定する
        this.shotArray[i].setSpeed(5.0);
        // ショットの方向を設定する
        this.shotArray[i].setVector(x, y);
        break;
      }
    }
  }

  update() {
    if (this.life <= 0) {
      return;
    }
    // タイプに応じて挙動を変える
    // タイプに応じてライフを0にする条件を変える
    switch (this.type) {
      // waveタイプはサイン波で揺れるように動く
      // ショットの向きは自機キャラクターの方向に打つ
      case "wave":
        // 配置後のフレームが60で割り切れるときにショットを打つ
        if (this.frame % 60 === 0) {
          // 攻撃対象となる自機キャラクターに向かうベクトル
          let targetX = this.attackTarget.position.x - this.position.x;
          let targetY = this.attackTarget.position.y - this.position.y;
          // ベクトルを単位化する
          let targetV = Vector2.calcNormal(targetX, targetY);
          // 自機キャラクターにややゆっくりめのショットを放つ
          this.fire(targetV.x, targetV.y, 4.0);
        }
        // X座標はサイン波で、Y座標は一定量で変化する
        this.position.x += Math.sin(this.frame / 10);
        this.position.y += 2.0;
        // 画面外に移動していたらライフを0に設定する
        if (this.position.y - this.height > this.ctx.canvas.height) {
          this.life = 0;
        }
        break;
      case "large":
        // 配置後のフレームが50で割り切れる時にショットを放つ
        if (this.frame % 50 === 0) {
          // 45度ごとにオフセットした全方位弾を放つ
          for (let i = 0; i < 360; i += 45) {
            let r = (i * Math.PI) / 180;
            // ラジアンからサインとコサインを求める
            let s = Math.sin(r);
            let c = Math.cos(r);
            // 求めたサイン、コサインでショットを放つ
            this.fire(c, s, 3.0);
          }
        }
        // X 座標はサイン波で、Y 座標は一定量で変化する
        this.position.x += Math.sin((this.frame + 90) / 50) * 2.0;
        this.position.y += 1.0;
        // 画面外（画面下端）へ移動していたらライフを0に設定する
        if (this.position.y - this.height > this.ctx.canvas.height) {
          this.life = 0;
        }
        break;
      case "default":
      default:
        // 配置後のフレームが50の時にショットを放つ
        if (this.frame === 50) {
          this.fire();
        }
        // 敵キャラクターを進行方向に沿って移動させる
        this.position.x += this.vector.x * this.speed;
        this.position.y += this.vector.y * this.speed;
        // 画面外へ移動したらライフを0にする
        if (this.position.y + this.height > this.ctx.canvas.height) {
          this.life = 0;
        }
        break;
    }

    this.draw();

    // 自身のフレームをインクリメントする
    ++this.frame;
  }
}
