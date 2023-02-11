import { Point } from "../types/Point";
import { checkLimits } from "../utils/checkLimits";

import { Actor } from "./Actor";

export class Pacman extends Actor {
  // Atributos
  size: number;
  color: string;
  speed: Point;
  maxSpeed: number;

  constructor(
    position = { x: 250, y: 250 },
    size = 75,
    color = "#fbe000",
    maxSpeed = 0
  ) {
    // Posición inicial del Pacman
    super(position);

    // Dimensiones del Pacman
    this.size = size;
    this.color = color;
    this.speed = { x: maxSpeed, y: maxSpeed };
    this.maxSpeed = maxSpeed;
  }

  // Métodos
  draw(ctx: CanvasRenderingContext2D, delta: number): void {
    ctx.translate(this.position.x, this.position.y);

    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.fillStyle = this.color;
    ctx.lineWidth = 10;
    ctx.fillRect(0, 0, 100, 100);

    ctx.moveTo(this.position.x, this.position.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }

  update(delta: number): void {
    let newPos: Point = {
      x: this.position.x + this.speed.x * (delta + 0.5),
      y: this.position.y + this.speed.y * (delta + 0.5),
    };
    if (checkLimits(newPos)) this.position = newPos;
  }

  keyboardEventDown(key: string): void {
    switch (key) {
      case "ArrowRight":
        this.speed.x = this.maxSpeed;
        this.speed.y = 0;

        break;
      case "ArrowLeft":
        this.speed.x = -this.maxSpeed;
        this.speed.y = 0;
        break;
      case "ArrowUp":
        this.speed.y = -this.maxSpeed;
        this.speed.x = 0;

        break;
      case "ArrowDown":
        this.speed.y = this.maxSpeed;
        this.speed.x = 0;

        break;
      default:
    }
  }
}
