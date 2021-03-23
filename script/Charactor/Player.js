import { CharactorBase } from "../base/CharactorBase.js";

export class Player extends CharactorBase {
  constructor(ctx, x, y, image) {
    super(ctx, x, y, 0, image);
  }
}
