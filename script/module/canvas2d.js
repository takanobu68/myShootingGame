export class GameScreen {
  constructor(canvas) {
    this.canvasElement = canvas;
    this.context2d = canvas.getContext("2d");
  }

  get canvas() {
    return this.canvasElement;
  }

  get context() {
    return this.context2d;
  }

  /**
   * 矩形を描画する
   * @param {number} x - 塗りつぶす矩形の左上角の X 座標
   * @param {number} y - 塗りつぶす矩形の左上角の Y 座標
   * @param {number} width - 塗りつぶす矩形の横幅
   * @param {number} height - 塗りつぶす矩形の高さ
   * @param {string} [color] - 矩形を塗りつぶす際の色
   */
  drawRect(x, y, width, height, color) {
    // 色が指定されている場合はスタイルを設定する
    if (color != null) {
      this.context2d.fillStyle = color;
    }
    this.context2d.fillRect(x, y, width, height);
  }

  /**
   * 画像をロードしてコールバック関数にロードした画像を与え呼び出す
   * @param {string} path - 画像ファイルのパス
   * @param {function} [callback] - コールバック関数
   */
  imageLoader(path, callback) {
    // 画像のインスタンスを生成する
    let target = new Image();
    // 画像がロード完了したときの処理を先に記述する
    target.addEventListener(
      "load",
      () => {
        // もしコールバックがあれば呼び出す
        if (callback != null) {
          // コールバック関数の引数に画像を渡す
          callback(target);
        }
      },
      false
    );
    // 画像のロードを開始するためにパスを指定する
    target.src = path;
  }
}
