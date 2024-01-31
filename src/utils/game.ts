import { GameState } from "../models/GameState";
import BulletController from "../controllers/BulletController";
import EnemyController from "../controllers/EnemyController";
import Player from "../models/Player";


const background = new Image();
background.src = '/src/assets/images/background.jpg';

export const startGame = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void => {
  const gameState = new GameState(canvas, ctx);

  loadAssets().then(() => {
    const playerBulletController = new BulletController(gameState.canvas, 10, '#d0620e', true);
    const enemyBulletController = new BulletController(gameState.canvas, 4, 'white', false);
    const enemyController = new EnemyController(gameState.canvas, enemyBulletController, playerBulletController);
    const player = new Player(gameState.canvas, 3, playerBulletController);

    gameState.reset();

    let lastFrameTime: number = 0;
    const targetFPS: number = 60;
    const targetFrameTime: number = 1000 / targetFPS;

    const gameLoop = (timestamp) => {
      // this is dope
      const deltaTime = timestamp - lastFrameTime;

      if (deltaTime >= targetFrameTime) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (background.complete) {
          ctx.drawImage(background, 0, 0, gameState.canvas.width, gameState.canvas.height);
        }
        // this does something idk
        lastFrameTime = timestamp - (deltaTime % targetFrameTime);
      }

      if (!gameState.isGameOver) {
        renderGame(ctx, gameState, player, enemyController, playerBulletController, enemyBulletController);
        requestAnimationFrame(gameLoop);
      } else {
        displayGameOver(ctx, gameState);
      }
    }
    // this is the entry point for the gameLoop
    requestAnimationFrame(gameLoop);
  })
}

const loadAssets = async (): Promise<void> => {
  await new Promise<void>(_ => background.onload = () => _());
}


const renderGame = (
  ctx: CanvasRenderingContext2D,
  gameState: GameState,
  player: Player,
  enemyController: EnemyController,
  playerBulletController: BulletController,
  enemyBulletController: BulletController) => {
  if (background.complete) {
    ctx.drawImage(background, 0, 0, gameState.canvas.width, gameState.canvas.height);
  }

  enemyController.draw(ctx);
  player.draw(ctx);
  playerBulletController.draw(ctx);
  enemyBulletController.draw(ctx);
}

const displayGameOver = (ctx: CanvasRenderingContext2D, gameState: GameState) => {
  let text = gameState.didWin ? "You Win" : "Game Over";
  let textOffset = gameState.didWin ? 3.5 : 5;

  ctx.fillStyle = "white"
  ctx.font = "70px Arial";
  ctx.fillText(text, gameState.canvas.width / textOffset, gameState.canvas.height / 2);
}
