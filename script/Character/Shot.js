import { CharacterBase } from "../common/CharacterBase.js";

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

  update() {
    if (this.life <= 0) {
      return;
    }

    if (
      this.position.y + this.height < 0 ||
      this.position.y + this.width > this.ctx.canvas.height
    ) {
      this.life = 0;
    }
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;

    // ショットと対象との衝突判定を行う
    this.targetArray.forEach((target) => {
      if (this.life <= 0 || target.life <= 0) {
        return;
      }
      let dist = this.position.distance(target.position);
      if (dist <= (this.width + target.width) / 4) {
        target.life -= this.power;
        this.life = 0;
      }
    });

    this.draw();
  }
}
