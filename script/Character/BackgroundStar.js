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

}
