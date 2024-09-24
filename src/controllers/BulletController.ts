import Bullet from "../models/Bullet";
import { Sprite } from "../models/Sprite";

export default class BulletController {
  bullets: Bullet[];
  private timeNextBullet: number = 0;

  private shootSound: HTMLAudioElement;
  private canvas: HTMLCanvasElement;
  private maxBullets: number;
  private bulletColor: string;
  private soundEnabled: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    maxBullets: number,
    bulletColor: string,
    soundEnabled: boolean,
  ) {
    this.canvas = canvas;
    this.maxBullets = maxBullets;
    this.bulletColor = bulletColor;
    this.soundEnabled = soundEnabled;
    this.shootSound = new Audio("assets/sounds/shoot.wav");
    this.shootSound.volume = 0.2;
    this.bullets = [];
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // bye bye bullets
    this.bullets.forEach((bullet) => bullet.draw(ctx));
  }

  update(): void {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height,
    );
    if (this.timeNextBullet > 0) this.timeNextBullet--;
  }

  // tbd should update for both Player and Enemy
  collideWith(sprite: Sprite): boolean {
    const bulletHitSpriteIndex = this.bullets.findIndex((bullet) =>
      bullet.collideWith(sprite),
    );
    if (bulletHitSpriteIndex >= 0) {
      this.bullets.splice(bulletHitSpriteIndex, 1);
      return true;
    }
    return false;
  }

  shoot(
    x: number,
    y: number,
    velocity: number,
    timeBetweenBullets: number,
  ): void {
    if (this.timeNextBullet <= 0 && this.bullets.length < this.maxBullets) {
      const bullet = new Bullet(x, y, velocity, this.bulletColor);
      this.bullets.push(bullet);
      if (this.soundEnabled) {
        this.shootSound.currentTime = 0;
        this.shootSound.play();
      }
      this.timeNextBullet = timeBetweenBullets;
    }
  }
}
