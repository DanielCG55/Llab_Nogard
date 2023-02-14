import { Point } from "../types/Point";
import { Actor } from "./Actor";
import { CellJr } from "./CellJr";
import { Gohan } from "./Gohan";

interface InitialCircuitProps {
    position?: Point;
    player: Gohan;
    linkedCellJr?: CellJr;
}

export class Cell extends Actor {
    //Atributos
    cellsjr: CellJr[] = [];
    completed: boolean = false;
    player: Gohan;
    nextCellJrToTouch?: number = 1;
    currentCellJrTouching?: number = undefined;

    constructor(props: InitialCircuitProps) {
        super({ x: 800, y: 800 });
        this.player = props.player;
        let celljr: CellJr | undefined;

        for (let i = 20; i > 0; i--) {
            celljr = new CellJr({
                position: {
                    x: Math.random() * (1000 - 600) + 600,
                    y: Math.random() * (500 - 100) + 100,
                },
                angle: 0,
                player: props.player,
                linkedCellJr: celljr,
                size: { w: 70, h: 70 },
            });

            this.cellsjr.push(celljr);
        }
    }

    // Métodos
    update(delta: number): void {
        // Comprueba que todos los Barrier han sido tocados
        let countCellJr = 0;
        for (let i = 0; i < this.cellsjr.length; i++) {
            if (this.cellsjr[i].touched) countCellJr++;
        }
        if (countCellJr == this.cellsjr.length) this.completed = true;

        // Comprueba el orden de los Barrier
        for (let i = 0; i < this.cellsjr.length; i++) {
            const currentCellJr = this.cellsjr[i];
            if (!currentCellJr.touched) break;
            this.nextCellJrToTouch = i + 1;
        }

        let currentIndex = this.cellsjr.findIndex((e) => e.thouching);

        if (typeof this.currentCellJrTouching == "undefined") {
            this.currentCellJrTouching = 0;
        }

        if (currentIndex != -1) {
            this.currentCellJrTouching = currentIndex;
        }

        // Reinicio si recorre el orden mal
        if (
            this.currentCellJrTouching != 0 &&
            this.nextCellJrToTouch != this.currentCellJrTouching + 1
        ) {
            this.currentCellJrTouching = undefined;
            this.player.restart();
            this.cellsjr.forEach((cell) => cell.restart());
        }
    }

    draw(ctx: CanvasRenderingContext2D, delta: number): void {
        ctx.translate(this.position.x, this.position.y);
        ctx.font = "35px Consolas";
        ctx.fillStyle = "#000";
        ctx.fillText(`CURRENT:${this.currentCellJrTouching}`, 0, 0);
        ctx.fillText(`NEXT:${this.nextCellJrToTouch}`, 0, 50);
    }
}
