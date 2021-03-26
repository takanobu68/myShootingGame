import { CharacterBase } from "../common/CharacterBase.js";
import { Player } from "./Player.js";

export class Shot extends CharacterBase {
  constructor(ctx, x, y, w, h, imagePath) {
    super(ctx, x, y, w, h, 0, imagePath);
    this.speed = 7;
    this.power = 1;
    this.targetArray = []; // 自身と衝突判定を取る対象を格納する
    this.explosionArray = [];
  }

  set(x, y, speed, power) {
    this.position.set(x, y);
    this.life = 1;
    this.setSpeed(speed);
    this.setPower(power);
  }

  setSpeed(speed) {
    if (speed !== null && speed > 0) {
      this.speed.speed;
    }
  }

  setPower(power) {
    if (power !== null && power > 0) {
      this.power = power;
    }
  }

  setTargets(targets) {
    if (targets !== null && Array.isArray(targets) && targets.length > 0) {
      this.targetArray = targets;
    }
  }

  setExplosions(targets) {
    if (targets != null && Array.isArray(targets) && targets.length > 0) {
      this.explosionArray = targets;
    }
  }

  update() {
    // もしショットライフが0だったら即終了
    if (this.life <= 0) {
      return;
    }

    // 画面外に移動していたらライフを0にする
    if (
      this.position.y + this.height < 0 ||
      this.position.y + this.width > this.ctx.canvas.height
    ) {
      this.life = 0;
    }

    // ショットを進行方向に沿って移動する
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;

    // ショットと対象との衝突判定を行う
    this.targetArray.forEach((target) => {
      // 自身(ショットそのもの)か対象のライフ0以下の場合は何もしない
      if (this.life <= 0 || target.life <= 0) {
        return;
      }
      // 自身の位置と対象との距離を測る
      let dist = this.position.distance(target.position);
      // 自身と対象の幅の1/4の距離まで近づいている場合衝突とみなす
      if (dist <= (this.width + target.width) / 4) {
        // 自機キャラクターが対象の場合、isComingフラグによって無敵になる
        if (target instanceof Player) {
          if (target.isComing === true) {
            return;
          }
        }
        // 対象のライフを攻撃力分減算する
        target.life -= this.power;
        // もし対象のライフが0以下になったら爆発させる
        if (target.life <= 0) {
          for (let i = 0; i < this.explosionArray.length; ++i) {
            // 発生していない爆発エフェクトがあれば対象の位置に生成する
            if (!this.explosionArray[i].life) {
              this.explosionArray[i].set(target.position.x, target.position.y);
              break;
            }
          }
        }
      }
    });

    this.draw();
  }
}
