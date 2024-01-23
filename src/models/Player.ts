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


}
