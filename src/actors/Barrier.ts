import { convertAngleToRad } from "../utils/convertAngleToRad";
import { distance } from "../utils/distance";
import { Point } from "../types/Point";
import { Actor } from "./Actor";
import { Size } from "../types/Size";
import { Gohan } from "./Gohan";

interface InitialBarrierProps {
  size: Size;
  position: Point;
  player: Gohan;
  color?: string;
  angle?: number;
  linkedBarrier?: Barrier;
}

const imagesSrc: string = "src/assets/img/";

export class Barrier extends Actor {
  //Atributos
  size: Size;

  color: string;
  player: Gohan;
  touched: boolean = false;
  thouching: boolean = false;
  barrierLength: number = 35;
  angle: number = 0;
  distance?: number;
  linkedBarrier?: Barrier;
  initialPosition: Point;
  image: HTMLImageElement;
  // imagesPosition: number[];
  currentImagePosition: number;

  constructor(props: InitialBarrierProps) {
    super(props.position);
    this.player = props.player;
    this.size = props.size;
    this.color = props.color || "blue";
    this.angle = props.angle || 0;
    this.linkedBarrier = props.linkedBarrier;
    this.initialPosition = props.position;
    this.image = new Image();
    this.image.src = imagesSrc + "celljr2.png";
    // this.imagesPosition = [0];
    this.currentImagePosition = 0;
  }

  update(delta: number): void {
    this.distance = distance(
      { x: this.position.x, y: this.position.y },
      { x: this.player.position.x, y: this.player.position.y }
    );

    if (this.distance <= this.barrierLength) {
      this.thouching = true;
      if (this.linkedBarrier) {
        if (this.linkedBarrier.touched) {
          this.touched = true;
        }
      } else {
        this.touched = true;
      }
    } else {
      this.thouching = false;
    }
  }

  // Métodos
  draw(ctx: CanvasRenderingContext2D, delta: number): void {
    ctx.translate(this.position.x, this.position.y);

    ctx.drawImage(
      this.image,
      0,
      0,
      38,
      38,
      -this.size.w / 2,
      -this.size.h / 2,
      this.size.w,
      this.size.h
    );

    // ctx.translate(this.position.x, this.position.y);

    // ctx.translate(this.position.x, this.position.y);
    // ctx.rotate(convertAngleToRad(this.angle));
    // ctx.fillStyle = this.touched ? "pink" : this.color;
    // ctx.beginPath();
    // ctx.arc(0, 0, 10, 0, convertAngleToRad(360));
    // ctx.closePath();
    // ctx.fill();
    // ctx.strokeStyle = this.thouching
    //   ? "green"
    //   : this.touched && !this.thouching
    //   ? "pink"
    //   : this.color;
    // ctx.beginPath();
    // ctx.moveTo(-this.barrierLength, 0);
    // ctx.lineTo(this.barrierLength, 0);
    // ctx.closePath();
    // ctx.stroke();
  }

  restart(): void {
    this.touched = false;
  }
}
