export class Vector2 {
  /**
   * ベクトルの長さを返す静的メソッド
   * @static
   * @param {number} x - X 要素
   * @param {number} y - Y 要素
   */
  static calcLength(x, y) {
    return Math.sqrt(x * x + y * y);
  }
  /**
   * ベクトルを単位化した結果を返す静的メソッド
   * @static
   * @param {number} x - X 要素
   * @param {number} y - Y 要素
   */
  static calcNormal(x, y) {
    let len = Vector2.calcLength(x, y);
    return new Vector2(x / len, y / len);
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    if (x !== null) this.x = x;
    if (y !== null) this.y = y;
  }

  distance(target) {
    let x = this.x - target.x;
    let y = this.y - target.y;
    return Math.sqrt(x * x + y * y);
  }
}
