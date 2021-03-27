import { UtilityCanvas } from "./module/UtilityCanvas.js";
import { Player } from "./Character/Player.js";
import { Shot } from "./Character/Shot.js";
import { Enemy } from "./Character/Enemy.js";
import { Scene } from "./common/Scene.js";
import { Explosion } from "./effect/Explosion.js";

export function init() {
  window.isKeyDown = {};
  window.gameScore = 0;
  const gameScreen = document.getElementById("game-screen");
  const shotMaxCount = 10;
  const enemyMaxCount = 10;
  const enemySmallMaxCount = 20;
  const enemyLargeMaxCount = 5;
  const enemyShotMaxCount = 50;
  const explosionMaxCount = 10;
  const shotArray = [];
  const slantingShotArray = [];
  const enemyArray = [];
  const enemyShotArray = [];
  const explosionArray = [];
  let util, canvas, ctx, startTime, player, scene;
  let restart = false;

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

    let i;

    // 爆発エフェクトを初期化する
    for (i = 0; i < explosionMaxCount; ++i) {
      explosionArray[i] = new Explosion(ctx, 50.0, 15, 30.0, 0.25);
    }

    for (i = 0; i < shotMaxCount; ++i) {
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

    for (i = 0; i < enemyMaxCount; ++i) {
      enemyArray[i] = new Enemy(ctx, 0, 0, 48, 48, "../images/enemy_small.png");
      enemyArray[i].setShotArray(enemyShotArray);
    }

    // 敵キャラクター(小)を初期化する
    for (i = 0; i < enemySmallMaxCount; ++i) {
      enemyArray[i] = new Enemy(ctx, 0, 0, 48, 48, "../images/enemy_small.png");
      // 敵キャラクターは全て同じショットを共有するのでここで与える
      enemyArray[i].setShotArray(enemyShotArray);
      // 敵キャラクターは常に自機キャラクターを攻撃対象とする
      enemyArray[i].setAttackTarget(player);
    }

    // 敵キャラクター(大)を初期化する
    for (i = 0; i < enemyLargeMaxCount; ++i) {
      enemyArray[enemySmallMaxCount + i] = new Enemy(
        ctx,
        0,
        0,
        64,
        64,
        "../images/enemy_large.png"
      );
      // 敵キャラクターは全て同じショットを共有するのでここで与える
      enemyArray[enemySmallMaxCount + i].setShotArray(enemyShotArray);
      // 敵キャラクターは常に自機キャラクターを攻撃対象とする
      enemyArray[enemySmallMaxCount + i].setAttackTarget(player);
    }

    for (i = 0; i < enemyShotMaxCount; ++i) {
      enemyShotArray[i] = new Shot(
        ctx,
        0,
        0,
        32,
        32,
        "../images/enemy_shot.png"
      );
      enemyShotArray[i].setTargets([player]);
      enemyShotArray[i].setExplosions(explosionArray);
    }

    player.setShotArray(shotArray, slantingShotArray);

    for (i = 0; i < shotMaxCount; ++i) {
      // 衝突判定を行うために対象を設定する
      shotArray[i].setTargets(enemyArray);
      slantingShotArray[i * 2].setTargets(enemyArray);
      slantingShotArray[i * 2 + 1].setTargets(enemyArray);
      // 爆発効果を発火させる為にショットに設定する
      shotArray[i].setExplosions(explosionArray);
      slantingShotArray[i * 2].setExplosions(explosionArray);
      slantingShotArray[i * 2 + 1].setExplosions(explosionArray);
    }
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

    enemyShotArray.forEach((shot) => {
      ready = ready && shot.ready;
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
      // GAME OVERから再スタートする為の設定
      if (e.key === "Enter") {
        // 自機キャラクターのライフが0以下の場合
        if (player.life <= 0) {
          // 再スタートフラグを立てる
          restart = true;
        }
      }
    });
    window.addEventListener("keyup", (e) => {
      isKeyDown[`key_${e.key}`] = false;
    });
  }

  function render() {
    ctx.globalAlpha = 1.0;
    util.drawRect(0, 0, canvas.width, canvas.height, "#eee");
    let nowTime = (Date.now() - startTime) / 1000;

    // スコアの表示
    ctx.font = "bold 24px monospace";
    util.drawText(zeroPadding(gameScore, 5), 30, 50, "#111111");

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

    enemyShotArray.forEach((shot) => {
      shot.update();
    });

    explosionArray.forEach((explosion) => {
      explosion.update();
    });

    scene.update();

    requestAnimationFrame(render);
  }

  function sceneSetting() {
    // イントロシーン
    scene.add("intro", (time) => {
      // 3秒経過したらシーンをinvade_default_typeにする
      if (time > 3.0) {
        scene.use("invade_default_type");
      }
    });
    // invadeシーン(default typeの敵キャラクターはを生成)
    scene.add("invade_default_type", (time) => {
      // シーンのフレーム数が30で割り切れるときは敵キャラクターを配置する
      if (scene.frame % 30 === 0) {
        // ライフが0の状態の敵キャラクター(小)が見つかったら配置する
        for (let i = 0; i < enemySmallMaxCount; ++i) {
          if (enemyArray[i].life <= 0) {
            let e = enemyArray[i];
            // ここからさらに2パターンに分ける
            // frameを60で割り切れるかどうかで分岐する
            if (scene.frame % 60 === 0) {
              // 左画面から出てくる
              e.set(e.width, 30, 2, "default");
              // 進行方向は30度の方向
              e.setVectorFromAngle(degreesToRadians(30));
            } else {
              // 右側面から出てくる
              e.set(canvas.width + e.width, 30, 2, "default");
              // 進行方向は 150 度の方向
              e.setVectorFromAngle(degreesToRadians(150));
            }
            break;
          }
        }
      }
      // シーンのフレーム数が270になったとき次のシーンへ
      if (scene.frame === 270) {
        scene.use("blank");
      }
      // 自機キャラクターが被弾してライフが0になっていたらGameOver
      if (player.life <= 0) {
        scene.use("gameover");
      }
    });

    // 間隔調整のための空白シーン
    scene.add("blank", (time) => {
      // シーンのフレーム数が150になったとき次のシーンへ
      if (scene.frame === 150) {
        scene.use("invade_wave_move_type");
      }
      // 被弾してライフが0になっていたらGameOver;
      if (player.life <= 0) {
        scene.use("gameover");
      }
    });

    // invadeシーン(wave move type の敵キャラクターを生成)
    scene.add("invade_wave_move_type", (time) => {
      // シーンのフレーム数が50で割り切れるときは敵キャラクターを配置する
      if (scene.frame % 50 === 0) {
        // ライフが0の状態の敵キャラクター(小)が見つかったら配置する
        for (let i = 0; i < enemySmallMaxCount; ++i) {
          if (enemyArray[i].life <= 0) {
            let e = enemyArray[i];
            // ここからさらに２パターンに分ける
            // frame が 200 以下かどうかで分ける
            if (scene.frame <= 200) {
              // 左側を進む
              e.set(canvas.width * 0.2, -e.height, 2, "wave");
            } else {
              // 右側を進む
              e.set(canvas.width * 0.8, -e.height, 2, "wave");
            }
            break;
          }
        }
      }
      // シーンのフレーム数が 450 になったとき次のシーンへ
      if (scene.frame === 450) {
        scene.use("invade_large_type");
      }
      // 自機キャラクターが被弾してライフが 0 になっていたらゲームオーバー
      if (player.life <= 0) {
        scene.use("gameover");
      }
    });

      if (scene.frame === 100) {
        scene.use("invade");
      }
      // 自機キャラクターが被弾してライフが0になっていたらゲームオーバー
      if (player.life <= 0) {
        scene.use("gameover");
      }
    });

    // ゲームオーバーシーン
    // ここでは画面にゲームオーバーの文字が流れ続けるようにする
    scene.add("gameover", (time) => {
      // 流れる文字の幅は画面の幅の半分を最大の幅とする
      let textWidth = canvas.width / 2;
      // 文字の幅を全体の幅に足し、ループする幅を決める
      let loopWidth = canvas.width + textWidth;
      // フレーム数に対する除算の剰余を計算し。文字列の位置とする
      let x = canvas.width - ((scene.frame * 2) % loopWidth);
      // 文字列の描画
      ctx.font = "bold 72px sans-serif";
      util.drawText("GAME OVER", x, canvas.height / 2, "#ff0000", textWidth);
      // 再スタートのための処理
      if (restart) {
        // 再スタートフラグはここでまず最初に下げておく
        restart = false;
        // スコアをリセットしておく
        gameScore = 0;
        // 再度スタートするための座標などの設定
        player.setComing(
          canvas.width / 2,
          canvas.height + 50,
          canvas.width / 2,
          canvas.height - 100
        );
        // シーンをintroに設定
        scene.use("intro");
      }
    });

    // 最初のシーンにはintroを設定する
    scene.use("intro");
  }

  function zeroPadding(number, count) {
    // 配列を指定の桁数分の長さで初期化する
    let zeroArray = new Array(count);
    // 配列の要素を0を挟んで連結する
    let zeroString = zeroArray.join("0") + number;
    // 文字列の後ろから桁数分だけ文字を抜き取る
    return zeroString.slice(-count);
  }

  /**
   * 度数法の角度からラジアンを生成する
   * @param {number} degrees - 度数法の度数
   */
  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }
}
