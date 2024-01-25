import Bullet from '../models/Bullet';

export default class BulletController {
  private shootSound: HTMLAudioElement;
  private timeNextBullet: number = 0;
  bullets: Bullet[];

  constructor(canvas: HTMLCanvasElement, maxBullets: number, bulletColor: number, soundEnabled: boolean) {
    this.shootSound = new Audio("../assets/sounds/shoot.wav");
    this.shootSound.volume = 0.2;
    this.bullets = [];
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // bye bye bullets
    this.bullets = this.bullets.filter(bullet => bullet._y + bullet._width > 0 && bullet._y <= this.canvas.height);

    // draw bullets
    this.bullets.forEach(bullet => bullet.draw(ctx));
    if (this.timeNextBullet > 0) this.timeNextBullet--;
  }

  shoot(x: number, y: number, velocity: number, timeNextBullet: number): void {
    if (this.timeNextBullet <= 0 && this.bullets.length < this.maxBullets) {
      const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
      this.bullets.push(bullet);
      if (this.soundEnabled) {
        this.shootSound.currentTime = 0;
        this.shootSound.play();
      }
      this.timeNextBullet = timeNextBullet;
    }
  }
}
