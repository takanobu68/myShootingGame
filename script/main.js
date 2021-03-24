import { UtilityCanvas } from "./module/UtilityCanvas.js";
import { Player } from "./Character/Player.js";
import { Shot } from "./Character/Shot.js";
import { Enemy } from "./Character/Enemy.js";
import { Scene } from "./common/Scene.js";

export function init() {
  window.isKeyDown = {};
  const gameScreen = document.getElementById("game-screen");
  const shotMaxCount = 10;
  const enemyMaxCount = 10;
  const shotArray = [];
  const slantingShotArray = [];
  const enemyArray = [];
  let util, canvas, ctx, startTime, player, scene;

  util = new UtilityCanvas(gameScreen);
  canvas = util.canvas;
  ctx = util.context;

  initialize();
  loadCheck();

  function initialize() {
    canvas.width = gameScreen.clientWidth;
    canvas.height = gameScreen.clientHeight;

    scene = new Scene();

    player = new Player(ctx, 0, 0, 64, 64, "../images/viper.png");

    player.setComing(
      canvas.width / 2,
      canvas.height,
      canvas.width / 2,
      canvas.height - 100
    );

    for (let i = 0; i < shotMaxCount; ++i) {
      shotArray[i] = new Shot(ctx, 0, 0, 32, 32, "../images/viper_shot.png");
      slantingShotArray[i * 2] = new Shot(
        ctx,
        0,
        0,
        32,
        32,
        "../images/viper_single_shot.png"
      );
      slantingShotArray[i * 2 + 1] = new Shot(
        ctx,
        0,
        0,
        32,
        32,
        "../images/viper_single_shot.png"
      );
    }

    for (let j = 0; j < enemyMaxCount; ++j) {
      enemyArray[j] = new Enemy(ctx, 0, 0, 48, 48, "../images/enemy_small.png");
      console.log(enemyArray[j]);
    }

    player.setShotArray(shotArray, slantingShotArray);
  }

  function loadCheck() {
    // 準備完了を意味する変数
    let ready = true;
    // AND演算子で準備完了しているかチェックする
    ready = ready && player.ready;
    // 同様にショットの準備状況も確認する
    shotArray.forEach((shot) => {
      ready = ready && shot.ready;
    });

    slantingShotArray.forEach((shot) => {
      ready = ready && shot.ready;
    });

    enemyArray.forEach((enemy) => {
      ready = ready && enemy.ready;
    });

    // 全ての準備が完了したら次の処理に進む
    if (ready) {
      // イベント設定
      eventSetting();
      // シーンを定義する
      sceneSetting();
      // 実行開始時のタイムスタンプを取得する
      startTime = Date.now();
      // 描画を開始する
      render();
    } else {
      // 準備が完了していない場合は0.1秒ごとに再帰呼び出しする
      setTimeout(loadCheck, 10);
    }
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

    shotArray.forEach((shot) => {
      shot.update();
    });

    slantingShotArray.forEach((shot) => {
      shot.update();
    });

    enemyArray.forEach((enemy) => {
      enemy.update();
    });

    scene.update();

    requestAnimationFrame(render);
  }

  function sceneSetting() {
    console.log(scene);
    // イントロシーン
    scene.add("intro", (time) => {
      // 2秒経過したらシーンをinvadeにする
      if (time > 2.0) {
        scene.use("invade");
      }
    });
    // invadeシーン
    scene.add("invade", (time) => {
      // シーンのフレーム数が0のとき以外は即座に終了する
      if (scene.frame !== 0) {
        return;
      }
      // lifeが0の状態の敵キャラクターが見つかったら配置する
      for (let i = 0; i < enemyMaxCount; ++i) {
        if (enemyArray[i].life <= 0) {
          let e = enemyArray[i];
          // 出現場所はXが画面中央、Yが画面上端の外側に設定する
          e.set(canvas.width / 2, -e.height);
          // 進行方向は真下に向かうように設定する
          e.setVector(0.0, 1.0);
          break;
        }
      }
    });

    // 最初にシーンにはintroを設定する
    scene.use("intro");
  }
}
