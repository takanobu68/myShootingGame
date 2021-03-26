import { CharacterBase } from "../common/CharacterBase.js";

export class Enemy extends CharacterBase {
  constructor(ctx, x, y, w, h, imagePath) {
    super(ctx, x, y, w, h, 0, imagePath);

    this.type = "default";

    this.frame = 0; // 間隔調整を行う為に使用

    this.speed = 3;

    this.shotArray = null;
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
