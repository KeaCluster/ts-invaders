export default class Bullet {
  private readonly width: number = 5;
  private readonly height: number = 20;

  constructor(
    private x: number,
    private y: number,
    private velocity: number,
    private bulletColor: string
  ) { }

  draw(ctx: CanvasRenderingContext2D): void {
    this.y -= this.velocity;
    ctx.fillStyle = this.bulletColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  collideWidth(sprite: { x: number; y: number; width: number; height: number; }): boolean {
    return this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height;
  }
}
