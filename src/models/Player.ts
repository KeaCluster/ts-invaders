import BulletController from "../controllers/BulletController";
import { Sprite } from "./Sprite";

export default class Player implements Sprite {
  private readonly _width: number = 40;
  private readonly _height: number = 48;
  private leftPressed: boolean = false;
  private shootPressed: boolean = false;
  private rightPressed: boolean = false;
  private image: HTMLImageElement;
  private _x: number;
  private _y: number;

  constructor(
    private canvas: HTMLCanvasElement,
    private velocity: number,
    private bulletController: BulletController,
  ) {
    this._x = this.canvas.width / 2;
    this._y = this.canvas.height - 72;
    this.image = new Image();
    this.image.src = "/src/assets/images/player.png";

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update(): void {
    this.move();
    this.collideWithWalls();
    if (this.shootPressed) {
      this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
    }
  }

  private collideWithWalls(): void {
    if (this._x < 0) {
      this._x = 0;
    } else if (this._x > this.canvas.width - this._width) {
      this._x = this.canvas.width - this._width;
    }
  }

  private move(): void {
    if (this.rightPressed) this._x += this.velocity;
    if (this.leftPressed) this._x -= this.velocity;
  }

  // ya know this makes sense
  private keydown = (event: KeyboardEvent): void => {
    switch (event.code) {
      case "ArrowRight":
        this.rightPressed = true;
        break;
      case "ArrowLeft":
        this.leftPressed = true;
        break;
      case "Space":
        this.shootPressed = true;
        break;
    }
  };
  private keyup = (event: KeyboardEvent): void => {
    switch (event.code) {
      case "ArrowRight":
        this.rightPressed = false;
        break;
      case "ArrowLeft":
        this.leftPressed = false;
        break;
      case "Space":
        this.shootPressed = false;
        break;
    }
  };

  collideWith(sprite: Sprite): boolean {
    return (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    );
  }

  reset(): void {
    this._x = this.canvas.width / 2;
    this._y = this.canvas.width - 72;
  }
}
