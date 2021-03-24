import { UtilityCanvas } from "./module/UtilityCanvas.js";
import { Player } from "./Character/Player.js";
import { Shot } from "./Character/Shot.js";

export function init() {
  window.isKeyDown = {};
  const gameScreen = document.getElementById("game-screen");
  const shotMaxCount = 10;
  const shotArray = [];
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

    player = new Player(ctx, 0, 0, 64, 64, "../images/viper.png");

    player.setComing(
      canvas.width / 2,
      canvas.height,
      canvas.width / 2,
      canvas.height - 100
    );

    for (let i = 0; i < shotMaxCount; ++i) {
      shotArray[i] = new Shot(ctx, 0, 0, 32, 32, "../images/viper_shot.png");
    }

    player.setShotArray(shotArray);
  }

  function eventSetting() {
    window.addEventListener("keydown", (e) => {
      isKeyDown[`key_${e.key}`] = true;
    });
    window.addEventListener("keyup", (e) => {
      isKeyDown[`key_${e.key}`] = false;
    });
  }

  function render() {
    ctx.globalAlpha = 1.0;
    util.drawRect(0, 0, canvas.width, canvas.height, "#eee");
    let nowTime = (Date.now() - startTime) / 1000;

    player.update();

    requestAnimationFrame(render);
  }
}
