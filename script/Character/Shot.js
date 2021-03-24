import { CharacterBase } from "../common/CharacterBase.js";

export class Shot extends CharacterBase {
  constructor(ctx, x, y, w, h, image) {
    super(ctx, x, y, w, h, 0, image);
    this.speed = 7;
  }

  set(x, y) {
    this.position.set(x, y);
    this.life = 1;
  }

  update() {
    if (this.life <= 0) {
      return;
    }

    if (this.position.y + this.height < 0) {
      this.life = 0;
    }
    this.position.y -= this.speed;

    this.draw();
  }
}
