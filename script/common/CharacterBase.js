import { Position } from "./Position.js";

export class CharacterBase {
  constructor(ctx, x, y, life, image) {
    this.ctx = ctx;
    this.position = new Position(x, y);
    this.life = life;
    this.image = image;
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
