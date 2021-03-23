import { CharactorBase } from "../common/CharactorBase.js";
import { Position } from "../common/Position.js";

export class Player extends CharactorBase {
  constructor(ctx, x, y, image) {
    super(ctx, x, y, 0, image);

    this.isComing = false;

    this.comingStart = null;

    this.comingEndPosition = null;
  }

  setComing(startX, startY, endX, endY) {
    this.isComing = true;
    this.comingStart = Date.now();
    this.position.set(startX, startY);
    this.comingEndPosition = new Position(endX, endY);
  }
}
