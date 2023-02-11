import { checkLimits } from "../utils/checkLimits";
import { Point } from "../types/Point";
import { Size } from "../types/Size";
import { convertAngleToRad } from "../utils/convertAngleToRad";
import { Actor } from "./Actor";

interface InitialGohanProps {
  position: Point;
  size: Size;
  color?: string;
  speed?: Point;
  acceleration?: number;
  angle?: number;
  angleSpeed?: number;
  maxSpeed: number;
}

const imagesSrc: string = "src/assets/img/";

export class Gohan extends Actor {
  // Atributos
  size: Size;
  color: string;
  speed: Point;
  initialPosition: Point;
  image: HTMLImageElement;
  imagesPosition: number[];
  currentImagePosition: number;
  timer: number;
  maxSpeed: number;

  constructor(props: InitialGohanProps) {
    // Posición inicial del Gohan
    super(props.position);
    // Dimensiones del Gohan
    this.size = props.size;
    this.color = props.color || "#d62828";
    this.speed = { x: 10, y: 10 };
    this.maxSpeed = props.maxSpeed;
    this.initialPosition = props.position;
    this.image = new Image();
    this.image.src = imagesSrc + "ekans.png";
    this.imagesPosition = [0, 1, 2];
    this.currentImagePosition = 0;
    this.timer = 0;
  }

  // Métodos
  draw(ctx: CanvasRenderingContext2D, delta: number): void {
    ctx.translate(this.position.x, this.position.y);

    // Image

    ctx.drawImage(
      this.image,
      50 * this.imagesPosition[this.currentImagePosition],
      50,
      50,
      50,
      -this.size.w / 2,
      -this.size.h / 2,
      this.size.w,
      this.size.h
    );

    // Canvas rectangle
    // ctx.fillStyle = this.color;
    // ctx.fillRect(-this.size.w / 2, -this.size.h / 2, this.size.w, this.size.h);
    // ctx.fillStyle = '#202020';
    // ctx.fillRect(-this.size.w / 2 + this.size.w - 20, -this.size.h / 2 + this.size.h - 35, 15, 30);
  }

  update(delta: number): void {
    let newPos: Point = {
      x: this.position.x + this.speed.x * (delta + 0.5),
      y: this.position.y + this.speed.y * (delta + 0.5),
    };

    if (checkLimits(newPos)) this.position = newPos;

    this.timer += delta;

    if (this.timer >= 0.05) {
      this.currentImagePosition = (this.currentImagePosition + 1) % 3;
      this.timer = 0;
    }
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
