import { Vector2 } from "../common/Vector2.js";

export class BackgroundStar {
  constructor(ctx, size, speed, color = "#ffffff") {
    this.ctx = ctx;

    /**
     * 大きさ
     * @type{number}
     */
    this.size = size;

    /**
     * 移動速度
     * @type{number}
     */
    this.speed = speed;

    /**
     * 塗りつぶす色
     * @type{string}
     */
    this.color = color;

    /**
     * 座標
     * @type{Vector2}
     */
    this.position = null;
  }

  set(x, y) {
    //引数を元に位置を決める
    this.position = new Vector2(x, y);
  }

  update() {
    // 色を設定する
    this.ctx.fillStyle = this.color;
    // 星の現在位置を速度に応じて動かす
    this.positiom.y += this.speed;
    // 星の矩形を描画する
    this.ctx.fillRect(
      his.position.x - this.size / 2,
      this.position.y - this.size / 2,
      this.size,
      this.size
    );
    // もし画面外に出てしまったら上端部に戻す
    if (this.position.y + this.size > this.ctx.canvas.height) {
      this.position.y = -this.size;
    }
  }
}
