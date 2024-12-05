import CanvasOption from "./CanvasOption.js";
import { randomNumBetween } from "./utils.js";

export default class Tail extends CanvasOption {
  constructor(x, vy, color) {
    super();
    this.x = x;
    this.y = this.canvasHeight;
    this.vy = vy;
    this.color = color;
    this.angle = randomNumBetween(0, 2);
    this.friction = 0.97;
  }

  update() {
    this.vy *= this.friction; // 마찰 효과
    this.y += this.vy;

    this.angle += 1; // 흔들리는 효과
    this.x += Math.cos(this.angle) * this.vy * 0.2;

    this.opacity = -this.vy * 0.1; // 사라지는 효과
  }

  draw() {
    this.ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
