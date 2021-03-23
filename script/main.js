import { UtilityCanvas } from "./module/UtilityCanvas.js";

export function init() {
  let util, canvas, ctx, image;

  const gameScreen = document.getElementById("game-screen");

  util = new UtilityCanvas(gameScreen);
  canvas = util.canvas;
  ctx = util.context;

  util.imageLoader("../images/viper.png", (loadedImage) => {
    image = loadedImage;
    initialize();
    render();
  });

  function initialize() {
    canvas.width = gameScreen.clientWidth;
    canvas.height = gameScreen.clientHeight;
  }

  function render() {
    util.drawRect(0, 0, canvas.width, canvas.height, "#eee");
    ctx.drawImage(image, 100, 100);
  }
}
