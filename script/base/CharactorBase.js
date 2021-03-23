import { Position } from "../param/Position.js";

export class CharactorBase {
  constructor(ctx, x, y, life, image) {
    this.ctx = ctx;
    this.position = new Position(x, y);
    this.life = life;
    this.image = image;
  }

  // draw() {
  //   this.ctx.drawImage(this.ctx, this.image, this.position.x, this.position.y);
  // }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
