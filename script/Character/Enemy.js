import { CharacterBase } from "../common/CharacterBase.js";

export class Enemy extends CharacterBase {
  constructor(ctx, x, y, w, h, imagePath) {
    super(ctx, x, y, w, h, 0, imagePath);

    this.speed = 3;
  }

  set(x, y, life = 1) {
    this.position.set(x, y);
    this.life = life;
  }

  update() {
    if (this.life <= 0) {
      return;
    }
    if (this.position.y + this.height > this.ctx.canvas.height) {
      this.life = 0;
    }
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;

    this.draw();
  }
}
