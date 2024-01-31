import './styles/style.css'
import { startGame } from './utils/game';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="game"></canvas>
  </div>
`
const canvas = document.getElementById("game") as HTMLCanvasElement;
canvas.width = 600;
canvas.height = 600;

const ctx = canvas.getContext("2d");

if (ctx) {
  startGame(canvas, ctx);
}
