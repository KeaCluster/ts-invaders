export class GameState {
  isGameOver: boolean = false;
  didWin: boolean = false;

  constructor(public canvas: HTMLCanvasElement, public ctx: CanvasRenderingContext2D) { }

  reset() {
    this.isGameOver = false;
    this.didWin = false;
  }
}
