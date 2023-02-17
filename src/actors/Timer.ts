import { Point } from "./../types/Point";
import { Actor } from "./Actor";

interface InitialTimerProps {
    position: Point;
    elapsed?: number;
}

export class Timer extends Actor {
    // Atributos
    elapsed: number;

    constructor(props: InitialTimerProps) {
        super(props.position);
        this.elapsed = props.elapsed || 120;
        if (this.elapsed <= 121) {
            alert("start the game");
        }
    }
    // Métodos
    draw(ctx: CanvasRenderingContext2D, delta: number): void {
        ctx.translate(this.position.x, this.position.y);
        const timer = (this.elapsed -= delta);
        ctx.font = "35px consolas";

        ctx.fillStyle = "#000";
        ctx.fillText("Time:", -70, 0);
        ctx.fillText(`${timer.toFixed(1)}`, 40, 0);
    }
}
