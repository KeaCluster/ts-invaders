import BulletController from "../controllers/BulletController";
import EnemyController from "../controllers/EnemyController";
import Bullet from "../models/Bullet";

const background = new Image();
background.src = '/src/assets/images/background.jpg';

let isBackgroundLoaded = false;
background.onload = () => isBackgroundLoaded = true;

const playerBulletController = new BulletController(canvas, 10, '#d0620e', true);
const enemyBulletController = new BulletController(canvas, 4, 'white', false);
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver: boolean = false;
let didWin: boolean = false;

export const game = (ctx: CanvasRenderingContext2D) => {
  checkGameOver();
  if (background) {
    ctx.drawImage(background, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

const displayGameOver = (): void => {
  if (isGameOver) {
    let text: string = didWin ? "You Win" : "Game Over";
    let textOffset: number = didWin ? 3.5 : 5;
    ctx.fillStyle = "white"
    ctx.font = "70px Arial";
    ctx.fillStyle(text, canvas.width / textOffset, canvas.height / 2);
  }
}

const checkGameOver = (): boolean => {
  if (isGameOver) return;
  if (enemyBulletController.collideWith(player)) { isGameOver = true; };
  if (enemyController.collideWith(player)) { isGameOver = true };
  if (enemyController.enemyRows.length === 0) {
    didWin = true; isGameOver = true;
  }
}
