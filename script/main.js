import { UtilityCanvas } from "./module/UtilityCanvas.js";

export function init() {
  const gameScreen = document.getElementById("game-screen");

  let util, canvas, ctx, image, startTime, player, comingStart;
  let isComing = false;
  let playerX = gameScreen.clientWidth / 2;
  let playerY = gameScreen.clientHeight / 2;

  util = new UtilityCanvas(gameScreen);
  canvas = util.canvas;
  ctx = util.context;

  util.imageLoader("../images/viper.png", (loadedImage) => {
    image = loadedImage;
    initialize();
    // 実行開始時のタイムスタンプを取得する
    startTime = Date.now();
    render();
  });

  function initialize() {
    canvas.width = gameScreen.clientWidth;
    canvas.height = gameScreen.clientHeight;
  }

  function render() {
    util.drawRect(0, 0, canvas.width, canvas.height, "#eee");
    ctx.drawImage(image, 100, 100);
    // 現在までの経過時間を取得する（ミリ秒を秒に変換するため 1000 で除算）
    let nowTime = (Date.now() - startTime) / 1000;
    requestAnimationFrame(render);
  }
}
