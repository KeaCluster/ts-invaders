import { Sprite } from "./Sprite";

export default class Bullet {
  private readonly _width: number = 5;
  private readonly _height: number = 20;

  private _x: number;
  private _y: number;

  constructor(
    x: number,
    y: number,
    private velocity: number,
    private bulletColor: string,
  ) {
    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x;
  }
  get y(): number {
    return this._y;
  }
  get width(): number {
    return this._width;
  }
  get height(): number {
    return this._height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this._y -= this.velocity;
    ctx.fillStyle = this.bulletColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  collideWith(sprite: Sprite): boolean {
    return (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    );
  }
}
