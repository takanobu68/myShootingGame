import { Position } from "./Position.js";

export class CharacterBase {
  constructor(ctx, x, y, w, h, life, imagePath) {
    this.ctx = ctx;
    this.position = new Position(x, y);
    this.vector = new Position(0.0, -1.0);
    this.width = w;
    this.height = h;
    this.life = life;
    this.ready = false;
    this.image = new Image();
    this.image.addEventListener("load", () => {
      this.ready = true;
    });
    this.image.src = imagePath;
  }

  setVector(x, y) {
    this.vector.set(x, y);
  }

  draw() {
    let offsetX = this.width / 2;
    let offsetY = this.height / 2;

    this.ctx.drawImage(
      this.image,
      this.position.x - offsetX,
      this.position.y - offsetY,
      this.width,
      this.height
    );
  }
}
