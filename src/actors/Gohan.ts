import { checkLimits } from "../utils/checkLimits";
import { Point } from "../types/Point";
import { Size } from "../types/Size";
import { Actor } from "./Actor";
import { Ammo } from "./Ammo";

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

const imagesSrc: string = "";

export class Gohan extends Actor {
    // Atributos
    size: Size;
    color: string;
    speed: Point;
    initialPosition: Point;
    image: HTMLImageElement;
    imagesPosition: number[];
    currentImagePosition: number;
    currentYposition: number;
    timer: number;
    maxSpeed: number;
    ammunition: Ammo[];

    constructor(props: InitialGohanProps) {
        // Posición inicial del Gohan
        super(props.position);
        // Dimensiones del Gohan
        this.size = props.size;
        this.color = props.color || "#d62828";
        this.speed = { x: 0, y: 0 };
        this.maxSpeed = props.maxSpeed;
        this.initialPosition = props.position;
        this.image = new Image();
        this.image.src = imagesSrc + "sprites1.png";
        this.imagesPosition = [0, 1, 2, 3, 4, 5];
        this.currentImagePosition = 0;
        this.currentYposition = 0;
        this.timer = 0;
        this.ammunition = [];
    }
    // Métodos
    draw(ctx: CanvasRenderingContext2D, delta: number): void {
        ctx.translate(this.position.x, this.position.y);

        ctx.drawImage(
            this.image,
            52 * this.imagesPosition[this.currentImagePosition],
            this.currentYposition,
            50,
            60,
            -this.size.w / 2,
            -this.size.h / 2,
            this.size.w,
            this.size.h
        );


    }

    update(delta: number): void {
        let newPos: Point = {
            x: this.position.x + this.speed.x * (delta + 0.5),
            y: this.position.y + this.speed.y * (delta + 0.5),
        };

        if (checkLimits(newPos)) this.position = newPos;

        this.timer += delta;

        if (this.timer >= 0.1) {
            this.currentImagePosition = (this.currentImagePosition + 1) % 1;
            this.timer = 0;
        }
    }

    keyboardEventDown(key: string): void {
        switch (key) {
            case "ArrowRight":
                this.speed.x = this.maxSpeed;
                this.speed.y = 0;
                this.imagesPosition = [1];

                break;
            case "ArrowLeft":
                this.speed.x = -this.maxSpeed;
                this.speed.y = 0;
                this.imagesPosition = [2];
                break;
            case "ArrowUp":
                this.speed.y = -this.maxSpeed;
                this.speed.x = 0;
                this.imagesPosition = [3];

                break;
            case "ArrowDown":
                this.speed.y = this.maxSpeed;
                this.speed.x = 0;
                this.imagesPosition = [4];

                break;
            case " ":
                this.imagesPosition = [5];
                this.speed.y = 0;
                this.speed.x = 0;
                this.shoot();
                console.log(...this.ammunition);
        }
    }

    keyboardEventUp(key: string): void {
        switch (key) {
            case "ArrowRight":
                this.speed.x = 0;
                this.speed.y = 0;
                this.imagesPosition = [0];

                break;
            case "ArrowLeft":
                this.speed.x = 0;
                this.speed.y = 0;
                this.imagesPosition = [0];
                break;
            case "ArrowUp":
                this.speed.x = 0;
                this.speed.y = 0;
                this.imagesPosition = [0];

                break;
            case "ArrowDown":
                this.speed.x = 0;
                this.speed.y = 0;
                this.imagesPosition = [0];

                break;
            case " ":
                this.imagesPosition = [0];
                this.speed.y = 0;
                this.speed.x = 0;
        }
    }

    restart() {}
    shoot() {
        const energyBall = new Ammo({ gohan: this });
        this.ammunition.push(energyBall);
    }
}
