import { GameEngine } from "./GameEngine";
import "./styles/style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="main">
    <canvas id="game"></canvas>
  </div>
`;
const canvas = document.getElementById("game") as HTMLCanvasElement;
canvas.width = 600;
canvas.height = 600;

const ctx = canvas.getContext("2d");

if (ctx) {
  const gameEngine = new GameEngine(canvas, ctx);
  gameEngine.start();
}
