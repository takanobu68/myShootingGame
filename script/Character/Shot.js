import { CharacterBase } from "../common/CharacterBase.js";
import { Vector2 } from "../common/Vector2.js";

export class Shot extends CharacterBase {
  constructor(ctx, x, y, w, h, imagePath) {
    super(ctx, x, y, w, h, 0, imagePath);
    this.speed = 7;
    this.vector = new Vector2(0.0, -1.0);
  }

  set(x, y) {
    this.position.set(x, y);
    this.life = 1;
  }

  setVector(x, y) {
    this.vector.set(x, y);
  }

  setSpeed(speed) {
    if (speed !== null && speed > 0) {
      this.speed.speed;
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
