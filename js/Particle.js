import CanvasOption from "./CanvasOption.js";

export default class Particle extends CanvasOption {
  constructor(x, y, vx, vy, opacity,color) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = opacity;
    this.gravity = 0.12;
    this.friction = 0.93;
    this.color = color;
  }

  update() {
    this.vy += this.gravity; // 중력 효과

    this.vx *= this.friction; // 마찰 효과
    this.vy *= this.friction;

    this.x += this.vx; // 퍼지는 효과
    this.y += this.vy;

    this.opacity -= 0.02; // 사라지는 효과
  }

  draw() {
    this.ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); // 360˚
    this.ctx.fill();
    this.ctx.closePath();
  }
}
