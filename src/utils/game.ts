// Canvas input
const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = '../assets/images/background.jpg';

const game = () => {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}


setInterval(game, 1000 / 60);
