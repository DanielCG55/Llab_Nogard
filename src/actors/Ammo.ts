import { Actor } from "./Actor";
import { Point } from "../types/Point";
import { Size } from "../types/Size";

import { distance } from "../utils/distance";
import { Gohan } from "./Gohan";
import { checkLimits } from "../utils/checkLimits";

interface InitialAmmoProps {
    position?: Point;
    speed?: number;
    gohan: Gohan;
}
const imagesSrc: string = "src/assets/img/";

export class Ammo extends Actor {
    size: Size;
    distance?: Point;
    speed: number;
    image: HTMLImageElement;
    gohan: Gohan;

    constructor(props: InitialAmmoProps) {
        super(props.position);
        this.gohan = props.gohan;
        this.position = { x: this.gohan.position.x, y: this.gohan.position.y };
        this.size = { w: 43, h: 14 };
        this.speed = 5;
        this.image = new Image();
        this.image.src = imagesSrc + "weapon.png";
    }

    update(delta: number): void {
        let newPos: Point = {
            x: this.position.x + this.speed * (delta + 0.5),
            y: this.position.y,
        };
        this.position = newPos;
    }

    draw(ctx: CanvasRenderingContext2D, delta: number): void {
        ctx.translate(this.position.x, this.position.y);
        // ctx.fillStyle = "black";
        // ctx.fillRect(
        //     -this.size.w / 2,
        //     -this.size.h / 2,
        //     this.size.w,
        //     this.size.h
        // );

        ctx.drawImage(
            this.image,
            0,
            0,
            43,
            14,
            -this.size.w / 2,
            -this.size.h / 2,
            this.size.w,
            this.size.h
        );
    }
}
