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

    const gameLoop = () => {
      if (!gameState.isGameOver) {
        updateGame(gameState, player, enemyController, playerBulletController, enemyBulletController);
        renderGame(ctx, gameState, player, enemyController, playerBulletController, enemyBulletController);
        requestAnimationFrame(gameLoop);
      } else {
        displayGameOver(ctx, gameState);
      }
    }
  })
}

const loadAssets = async (): Promise<void> => {
  const backgroundLoaded = new Promise<void>(_ => background.onload = () => _());
  await backgroundLoaded;
}
function updateGame(gameState: GameState, player: Player, enemyController: EnemyController, playerBulletController: BulletController, enemyBulletController: BulletController) {
  // Logic to update game entities and check for game over conditions
  // This might include moving entities, checking for collisions, etc.
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
