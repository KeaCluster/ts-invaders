import Bullet from "./Bullet";

export default class Enemy {
  private readonly _width: number = 44;
  private readonly _height: number = 32;
  private image: HTMLImageElement;

  private _y: number;
  private _x: number;

  constructor(x: number, y: number, imageNumber: number) {
    this._x = x;
    this._y = y;
    this.image = new Image();
    this.image.src = `./images/enemy${imageNumber}.png`;
  }

  get x(): number { return this._x }
  get y(): number { return this._y }
  get width(): number { return this._width }
  get height(): number { return this._height }


  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this._x, this._y, this._width, this._height)
  }

  move(xVelocity: number, yVelocity: number): void {
    this._x += xVelocity;
    this._y += yVelocity;
  }

  collideWidth(sprite: Bullet) {
    return this._x + this._width > sprite.x &&
      this._x < sprite.x + sprite.width &&
      this._y + this.height > sprite.y &&
      this._y < sprite.y + sprite.height;
  }
}
