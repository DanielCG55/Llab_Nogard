import { Point } from "../types/Point";
import { Size } from "../types/Size";
import { Actor } from "./Actor";

interface InitialEnemyProps {
    size: Size;
    position: Point;
    color?: string;
    angle?: number;
}

export class Enemy extends Actor {
    //Atributos
    size: Size;
    color: string;
    enemyLength: number = 35;
    // distance?: number;
    initialPosition: Point;
    image: HTMLImageElement;
    imagesPosition: number[];
    currentImagePosition: number;
    expired: boolean;

    constructor(props: InitialEnemyProps) {
        super(props.position);

        this.size = props.size;
        this.color = props.color || "blue";
        this.initialPosition = props.position;
        this.image = new Image();
        this.image.src = "clljr2.png";
        this.imagesPosition = [0];
        this.currentImagePosition = 100;
        this.expired = false;
    }

    update(delta: number): void {
        if (this.expired === true) {
            this.imagesPosition[1];
        }
    }
    // Métodos
    draw(ctx: CanvasRenderingContext2D, delta: number): void {
        ctx.translate(this.position.x, this.position.y);

        ctx.drawImage(
            this.image,
            0,
            0,
            40,
            40,
            -this.size.w / 2,
            -this.size.h / 2,
            this.size.w,
            this.size.h
        );
    }
}
