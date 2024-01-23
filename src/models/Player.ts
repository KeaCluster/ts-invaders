import BulletController from '../controllers/BulletController';

export default class Player {
  private leftPressed: boolean = false;
  private shootPressed: boolean = false;
  private rightPressed: boolean = false;
  private x: number;
  private y: number;
  private readonly width: number = 40;
  private readonly height: number = 48;
  private image: HTMLImageElement;

  // this shit is so weird man lmao

  constructor(
    private canvas: HTMLCanvasElement,
    private velocity: number,
    private bulletController: BulletController
  ) {
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 72;
    this.image = new Image();
    this.image.src = '../assets/images/player.png';

    document.addEventListener('keydown', this.keydown)
    document.addEventListener('keyup', this.keyup)
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.move();
    this.collideWithWalls();
    if (this.shootPressed) {
      this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  private collideWithWalls(): void {
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
  }

  private move(): void {
    if (this.rightPressed) this.x += this.velocity;
    if (this.leftPressed) this.x -= this.velocity;
  }

  // ya know this makes sense

  private keydown = (event: KeyboardEvent): void => {
    switch (event.code) {
      case 'ArrowRight':
        this.rightPressed = true;
        break;
      case 'ArrowLeft':
        this.leftPressed = true;
        break;
      case 'Space':
        this.shootPressed = true;
        break;
    }

  }
  private keyup = (event: KeyboardEvent): void => {
    switch (event.code) {
      case 'ArrowRight':
        this.rightPressed = false;
        break;
      case 'ArrowLeft':
        this.leftPressed = false;
        break;
      case 'Space':
        this.shootPressed = false;
        break;
    }
  }

}
