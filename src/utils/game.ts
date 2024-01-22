const background = new Image();
background.src = '../assets/images/background.jpg';

let isbackgroundLoaded = false;

background.onload = () => isbackgroundLoaded = true;

export const game = (ctx: CanvasRenderingContext2D) => {
  if (isbackgroundLoaded) {
    ctx.drawImage(background, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
