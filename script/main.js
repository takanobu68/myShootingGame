import { UtilityCanvas } from "./module/UtilityCanvas.js";
import { Position } from "./common/Position.js";
import { Player } from "./Charactor/Player.js";

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
    eventSetting();
    render();
  });

  function initialize() {
    canvas.width = gameScreen.clientWidth;
    canvas.height = gameScreen.clientHeight;

    player = new Player(ctx, 0, 0, image);

    player.setComing(
      canvas.width / 2,
      canvas.height,
      canvas.width / 2,
      canvas.height - 100
    );
  }

  function eventSetting() {
    window.addEventListener(
      "keydown",
      (event) => {
        switch (event.key) {
          case "ArrowLeft":
            playerX -= 10;
            break;
          case "ArrowRight":
            playerX += 10;
            break;
          case "ArrowUp":
            playerY -= 10;
            break;
          case "ArrowDown":
            playerY += 10;
            break;
        }
      },
      false
    );
  }

  function render() {
    ctx.globalAlpha = 1.0;
    util.drawRect(0, 0, canvas.width, canvas.height, "#eee");
    // 現在までの経過時間を取得する（ミリ秒を秒に変換するため 1000 で除算）
    let nowTime = (Date.now() - startTime) / 1000;

    if (player.isComing) {
      let justTime = Date.now();
      let comingTime = (justTime - player.comingStart) / 1000;
      let y = canvas.clientHeight - comingTime * 50;
      if (y <= player.comingEndPosition.y) {
        player.isComing = false;
        y = player.comingEndPosition.y;
      }

      player.position.set(player.position.x, y);

      if (justTime % 100 < 50) {
        ctx.globalAlpha = 0.5;
      }
    }

    player.draw();

    requestAnimationFrame(render);
  }
}
