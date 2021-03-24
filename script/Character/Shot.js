import { CharacterBase } from "../common/CharacterBase.js";
import { Position } from "../common/Position.js";

export class Shot extends CharacterBase {
  constructor(ctx, x, y, w, h, imagePath) {
    super(ctx, x, y, w, h, 0, imagePath);
    this.speed = 7;
    this.vector = new Position(0.0, -1.0);
  }

  set(x, y) {
    this.position.set(x, y);
    this.life = 1;
  }

  setVector(x, y) {
    this.vector.set(x, y);
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
