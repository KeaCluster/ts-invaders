import { GameState } from "./models/GameState";
import BulletController from "./controllers/BulletController";
import EnemyController from "./controllers/EnemyController";
import Player from "./models/Player";

const background = new Image();
background.src = "/assets/images/background.jpg";

export class GameEngine {
  private lastFrameTime = 0;
  private readonly targetFPS = 60;
  private readonly targetFrameTime = 1000 / this.targetFPS;
  private gameState: GameState;
  private playerBulletController: BulletController;
  private enemyBulletController: BulletController;
  private enemyController: EnemyController;
  private player: Player;

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
  ) {
    this.gameState = new GameState(canvas, ctx);
    this.playerBulletController = new BulletController(
      canvas,
      10,
      "#d0620e",
      true,
    );
    this.enemyBulletController = new BulletController(
      canvas,
      4,
      "white",
      false,
    );
    this.enemyController = new EnemyController(
      canvas,
      this.enemyBulletController,
      this.playerBulletController,
    );
    this.player = new Player(canvas, 3, this.playerBulletController);
  }

  start() {
    this.gameState.reset();
    requestAnimationFrame(this.gameLoop);
  }

  private gameLoop = (timestamp: number) => {
    const deltaTime = timestamp - this.lastFrameTime;

    if (deltaTime >= this.targetFrameTime) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (background.complete) {
        this.ctx.drawImage(
          background,
          0,
          0,
          this.gameState.canvas.width,
          this.gameState.canvas.height,
        );
      }
      this.lastFrameTime = timestamp - (deltaTime % this.targetFrameTime);
    }
    if (!this.gameState.isGameOver) {
      this.update();
      this.render();
      requestAnimationFrame(this.gameLoop);
    } else {
      this.displayGameOver();
    }
  };

  private update() {
    this.enemyController.update();
    this.player.update();
    this.playerBulletController.update();
    this.enemyBulletController.update();

    if (this.enemyBulletController.collideWith(this.player)) {
      this.handlePlayerGameOver();
    }
  }
  private render() {
    this.enemyController.draw(this.ctx);
    this.player.draw(this.ctx);
    this.playerBulletController.draw(this.ctx);
    this.enemyBulletController.draw(this.ctx);
  }

  // to implement on update();
  private handlePlayerGameOver() {
    this.gameState.isGameOver = true;
    this.gameState.didWin = false;
  }

  private displayGameOver() {
    let text = this.gameState.didWin ? "You Win" : "Game Over";
    let textOffset = this.gameState.didWin ? 3.5 : 5;

    this.ctx.fillStyle = "white";
    this.ctx.font = "70px Arial";
    this.ctx.fillText(
      text,
      this.gameState.canvas.width / textOffset,
      this.gameState.canvas.height / 2,
    );
  }
}
