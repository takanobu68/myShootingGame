import { Vector2 } from "../common/Vector2.js";

export class Explosion {
  /**
   * @constructor
   * @param {CanvasRenderingContext2D} ctx - 描画などに利用する 2D コンテキスト
   * @param {number} radius - 爆発の広がりの半径
   * @param {number} count - 爆発の火花の数
   * @param {number} size - 爆発の火花の大きさ（幅・高さ）
   * @param {number} timeRange - 爆発が消えるまでの時間（秒単位）
   * @param {string} [color='#ff1166'] - 爆発の色
   */
  constructor(ctx, radius, count, size, timeRange, color = "#ff1166") {
    /**
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = ctx;
    /**
     * 爆発の生存状態を表すフラグ
     * @type {boolean}
     */
    this.life = false;
    /**
     * 爆発を fill する際の色
     * @type {string}
     */
    this.color = color;
    /**
     * 自身の座標
     * @type {Position}
     */
    this.position = null;
    /**
     * 爆発の広がりの半径
     * @type {number}
     */
    this.radius = radius;
    /**
     * 爆発の火花の数
     * @type {number}
     */
    this.count = count;
    /**
     * 爆発が始まった瞬間のタイムスタンプ
     * @type {number}
     */
    this.startTime = 0;
    /**
     * 爆発が消えるまでの時間
     * @type {number}
     */
    this.timeRange = timeRange;
    /**
     * 火花のひとつあたりの大きさ（幅・高さ）
     * @type {number}
     */
    this.fireSize = size;
    /**
     * 火花の位置を格納する
     * @type {Array<Position>}
     */
    this.firePosition = [];
    /**
     * 火花の進行方向を格納する
     * @type {Array<Position>}
     */
    this.fireVector = [];
  }

  /**
   * 爆発エフェクトを設定する
   * @param {number} x - 爆発を発生させる X 座標
   * @param {number} y - 爆発を発生させる Y 座標
   */
  set(x, y) {
    // 火花の個数分ループして生成する
    for (let i = 0; i < this.count; ++i) {
      // 引数を元に位置を決める
      this.firePosition[i] = new Vector2(x, y);
      // ランダムに火花が進む方向（となるラジアン）を決める
      let r = Math.random() * Math.PI * 2.0;
      // ラジアンを元にサインとコサインを生成し進行方向に設定する
      let s = Math.sin(r);
      let c = Math.cos(r);
      this.fireVector[i] = new Vector2(c, s);
    }
    // 爆発の生存状態を設定
    this.life = true;
    // 爆発が始まる瞬間のタイムスタンプを取得する
    this.startTime = Date.now();
  }

  /**
   * 爆発エフェクトを更新する
   */
  update() {
    // 生存状態を確認する
    if (this.life !== true) {
      return;
    }
    // 爆発エフェクト用の色を設定する
    this.ctx.fillStyle = this.color;
    this.ctx.globalAlpha = 0.5;
    // 爆発が発生してからの経過時間を求める
    let time = (Date.now() - this.startTime) / 1000;
    // 爆発終了までの時間で正規化して進捗度合いを算出する
    let progress = Math.min(time / this.timeRange, 1.0);

    // 進捗度合いに応じた位置に火花を描画する
    for (let i = 0; i < this.firePosition.length; ++i) {
      // 火花が広がる距離
      let d = this.radius * progress;
      // 広がる距離分だけ移動した位置
      let x = this.firePosition[i].x + this.fireVector[i].x * d;
      let y = this.firePosition[i].y + this.fireVector[i].y * d;
      // 矩形を描画する
      this.ctx.fillRect(
        x - this.fireSize / 2,
        y - this.fireSize / 2,
        this.fireSize,
        this.fireSize
      );
    }

    // 進捗が 100% 相当まで進んでいたら非生存の状態にする
    if (progress >= 1.0) {
      this.life = false;
    }
  }
}
