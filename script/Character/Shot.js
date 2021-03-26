import { CharacterBase } from "../common/CharacterBase.js";
import { Vector2 } from "../common/Vector2.js";

export class Shot extends CharacterBase {
  constructor(ctx, x, y, w, h, imagePath) {
    super(ctx, x, y, w, h, 0, imagePath);
    this.speed = 7;
    this.power = 1;
    this.targetArray = []; // 自身と衝突判定を取る対象を格納する
  }

  set(x, y) {
    this.position.set(x, y);
    this.life = 1;
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

    if (this.position.y + this.height < 0) {
      this.life = 0;
    }

    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;

    this.draw();
  }
}
