import { UtilityCanvas } from "./module/UtilityCanvas.js";
import { Player } from "./Character/Player.js";

export function init() {
  const gameScreen = document.getElementById("game-screen");

  let util, canvas, ctx, image, startTime, player;

  util = new UtilityCanvas(gameScreen);
  canvas = util.canvas;
  ctx = util.context;

  util.imageLoader("../images/viper.png", (loadedImage) => {
    image = loadedImage;
    initialize();
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
            player.position.x -= 10;
            break;
          case "ArrowRight":
            player.position.x += 10;
            break;
          case "ArrowUp":
            player.position.y -= 10;
            break;
          case "ArrowDown":
            player.position.y += 10;
            break;
        }
      },
      false
    );
  }

  function render() {
    ctx.globalAlpha = 1.0;
    util.drawRect(0, 0, canvas.width, canvas.height, "#eee");
    let nowTime = (Date.now() - startTime) / 1000;

    player.update();

    requestAnimationFrame(render);
  }
}
