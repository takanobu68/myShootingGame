export class Scene {
  constructor() {
    // シーンを格納する為のオブジェクト
    this.scene = {};
    // 現在アクティブなシーン
    this.activeScene = null;
    // 現在のシーンがアクティブになった時刻のアクティブスタンプ
    this.startTime = null;
    // 現在のシーンがアクティブになってからのシーンの実行回数
    this.fram = null;
  }

  // シーンを追加する
  add(name, updateFunction) {
    this.scene[name] = updateFunction;
  }

  // アクティブなシーンを設定する
  use(name) {
    // 指定されたシーンが存在するか調べる
    if (!this.scene.hasOwnProperty(name)) {
      return;
    }
    // 名前を元にアクティブなシーンを設定する
    this.activeScene = this.scene[name];
    // シーンをアクティブにした瞬間のタイムスタンプを取得する
    this.startTime = Date.now();
    // シーンをアクティブにしたのでカウンターをリセットする
    this.frame = -1;
  }

  // シーンを更新する
  update() {
    // シーンがアクティブになってからの経過時間
    let activeTime = (Date.now() - this.startTime) / 1000;
    // 経過時間を引数に与えてupdateFunctionを呼び出す
    this.activeScene(activeTime);
    // シーンを更新したのでカウンターをインクリメントする
    ++this.frame;
  }
}
