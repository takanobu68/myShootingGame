import { Position } from "./Position.js";

export class CharacterBase {
  constructor(ctx, x, y, w, h, life, image) {
    this.ctx = ctx;
    this.position = new Position(x, y);
    this.w = w;
    this.h = h;
    this.life = life;
    this.image = image;
  }

  draw() {
    let offSetX = this.w / 2;
    let offSetY = this.h / 2;

    this.ctx.drawImage(
      this.image,
      this.position.x - offSetX,
      this.position.y - offSetY,
      this.width,
      this.height
    );
  }
}
