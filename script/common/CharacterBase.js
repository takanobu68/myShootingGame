import { Vector2 } from "./Vector2.js";

export class CharacterBase {
  constructor(ctx, x, y, w, h, life, imagePath) {
    this.ctx = ctx;
    this.position = new Vector2(x, y);
    this.vector = new Vector2(0.0, -1.0);
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

  /**
   * 進行方向を角度を元に設定する
   * @param {number} angle - 回転量（ラジアン）
   */
  setVectorFromAngle(angle) {
    // 自身の回転量を設定する
    this.angle = angle;
    // ラジアンからサインとコサインを求める
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    // 自身の vector プロパティに設定する
    this.vector.set(cos, sin);
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
