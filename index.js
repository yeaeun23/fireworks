import CanvasOption from "./js/CanvasOption.js";
import Tail from "./js/Tail.js";
import Particle from "./js/Particle.js";
import Spark from "./js/Spark.js";
import { randomNumBetween, hypotenuse } from "./js/utils.js";

class Canvas extends CanvasOption {
  constructor() {
    super();

    this.tails = [];
    this.particles = [];
    this.sparks = [];
  }

  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;

    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";
  }

  createTail() {
    const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8);
    const vy = randomNumBetween(15, 20) * -1;
    const colorDeg = randomNumBetween(0, 360);

    this.tails.push(new Tail(x, vy, colorDeg));
  }

  createParticles(x, y, colorDeg) {
    const PARTICLE_NUM = 400; // 파티클 개수

    for (let i = 0; i < PARTICLE_NUM; i++) {
      const r = randomNumBetween(2, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001; // 화면 크기에 따른 반지름
      const angle = (Math.PI / 180) * randomNumBetween(0, 360); // Θ(rad)
      const vx = r * Math.cos(angle); // 파티클 퍼지는 좌표(가속도)
      const vy = r * Math.sin(angle);
      const opacity = randomNumBetween(0.6, 0.9);
      const _colorDeg = randomNumBetween(-20, 20) + colorDeg;

      this.particles.push(new Particle(x, y, vx, vy, opacity, _colorDeg));
    }
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);

      now = Date.now();
      delta = now - then;

      if (delta < this.interval) {
        return;
      }

      // 배경색으로 덮어쓰기(지우기)
      this.ctx.fillStyle = this.bgColor + "40"; // 투명도로 잔상 효과
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      // 꼬리 생성
      if (Math.random() < 0.03) {
        this.createTail();
      }

      // 꼬리 그리기
      this.tails.forEach((tail, index) => {
        tail.update();
        tail.draw();

        // 스파크 연결(올라갈수록 조금 생성)
        for (let i = 0; i < Math.round(-tail.vy * 0.5); i++) {
          const vx = randomNumBetween(-5, 5) * 0.05;
          const vy = randomNumBetween(-5, 5) * 0.05;
          const opacity = Math.min(-tail.vy, 0.5);

          this.sparks.push(new Spark(tail.x, tail.y, vx, vy, opacity, tail.colorDeg));
        }

        // 안보이는 꼬리 배열에서 제거(CPU 사용량 ↓)
        if (tail.vy > -0.7) {
          this.tails.splice(index, 1);
          // 불꽃 연결
          this.createParticles(tail.x, tail.y, tail.colorDeg);
        }
      });

      // 불꽃 그리기
      this.particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // 안보이는 파티클 배열에서 제거
        if (particle.opacity <= 0) {
          this.particles.splice(index, 1);
        }

        // 스파크 연결
        if (Math.random() < 0.1) {
          this.sparks.push(new Spark(particle.x, particle.y, 0, 0, 0.3, 45));
        }
      });

      // 스파크 그리기
      this.sparks.forEach((spark, index) => {
        spark.update();
        spark.draw();

        // 안보이는 스파크 배열에서 제거
        if (spark.opacity <= 0) {
          this.sparks.splice(index, 1);
        }
      });

      then = now - (delta % this.interval);
    };

    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

window.addEventListener("load", () => {
  canvas.init();
  canvas.render();
});

window.addEventListener("resize", () => {
  canvas.init();
});
