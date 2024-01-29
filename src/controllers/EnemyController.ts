import MovingDirection from '../utils/MovingDirection.ts';
import Enemy from '../models/Enemy.ts';
import Bullet from '../models/Bullet.ts';
import { createEnemyMap } from '../utils/enemyMap.ts';
import BulletController from './BulletController.ts';

export default class EnemyController {
  private enemyMap: number[][];
  private enemyRows: Enemy[][] = [];
  private currentDirection = MovingDirection.right;
  private xVelocity: number = 0;
  private yVelocity: number = 0;
  private readonly defaultXVelocity: number = 1;
  private readonly defaultYVelocity: number = 1;
  private readonly moveDownTimerDefault: number = 0;
  private moveDownTimer: number = this.moveDownTimerDefault;
  private readonly fireBulletTimerDefault: number = 100;
  private fireBulletTimer: number = this.fireBulletTimerDefault;
  private enemyDeathSound: HTMLAudioElement;

  constructor(
    private canvas: HTMLCanvasElement,
    private maxBullets: number,
    private bulletColor: string,
    private soundEnabled: boolean,
    private enemyBulletController: BulletController,
    private playerBulletController: BulletController,
  ) {
    this.enemyDeathSound = new Audio('../assets/sounds/enemy-death.wav');
    this.enemyDeathSound.volume = 0.2;
    this.enemyMap = createEnemyMap();
    this.createEnemies();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.decrementMoveDownTimer();
    this.updateVelocityAndDirection();
    this.collisionDetection();
    this.drawEnemies(ctx);
    this.resetMoveDownTimer();
    this.fireBullet();
  }

  collisionDetection(): void {
    this.enemyRows.forEach(enemyRow => {
      enemyRow.forEach((enemy, enemyIndex) => {
        if (this.playerBulletController.collideWith(enemy)) {
          this.enemyDeathSound.currentTime = 0;
          this.enemyDeathSound.play();
          enemyRow.splice(enemyIndex, 1);
        }
      });
    });
    this.enemyRows = this.enemyRows.filter(enemyRow => enemyRow.length > 0);
  }

  fireBullet(): void {
    this.fireBulletTimer--;
    if (this.fireBulletTimer <= 0) {
      this.fireBulletTimer = this.fireBulletTimerDefault;
      const allEnemies = this.enemyRows.flat();
      const enemyIndex = Math.floor(Math.random() * allEnemies.length);
      const enemy: Enemy = allEnemies[enemyIndex];
      this.enemyBulletController.shoot(enemy.x, enemy.y, -3, this.fireBulletTimer);
    }
  }

  resetMoveDownTimer(): void {
    if (this.moveDownTimer <= 0) this.moveDownTimer = this.moveDownTimerDefault;
  }

  decrementMoveDownTimer(): void {
    if (this.currentDirection === MovingDirection.downLeft || this.currentDirection === MovingDirection.downRight) {
      this.moveDownTimer--;
    }
  }

  // number question mark
  moveDown(newDirection: number): boolean {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;
    if (this.moveDownTimer <= 0) {
      this.currentDirection = newDirection;
      return true;
    }
    return false;
  }

  drawEnemies(ctx: CanvasRenderingContext2D): void {
    this.enemyRows.flat().forEach(enemy => {
      enemy.move(this.xVelocity, this.yVelocity);
      enemy.draw(ctx);
    })
  }

  createEnemies(): void {
    this.enemyMap.forEach((row, index) => {
      this.enemyRows[index] = [];
      row.forEach((enemyNumber, eIndex) => {
        if (enemyNumber > 0) {
          this.enemyRows[index].push(new Enemy(eIndex * 50, index * 35, enemyNumber));
        }
      })
    })
  }

  collideWith(sprite: Bullet): boolean {
    return this.enemyRows.flat().some(enemy => enemy.collideWith(sprite));
  }

  updateVelocityAndDirection(): void {
    for (const enemyRow of this.enemyRows) {
      if (this.currentDirection === MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        const rightMostEnemy = enemyRow[enemyRow.length - 1];
        if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
          this.currentDirection = MovingDirection.downLeft;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downLeft) {
        if (this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftMostEnemy = enemyRow[0];
        if (leftMostEnemy.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }
}
