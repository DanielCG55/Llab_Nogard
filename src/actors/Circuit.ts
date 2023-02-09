import { Point } from '../types/Point';
import { Actor } from './Actor';
import { Barrier } from './Barrier';
import { Car } from './Car';

interface InitialCircuitProps {
    position: Point
    car: Car;
}

export class Circuit extends Actor {
    //Atributos
    barriers: Barrier[] = [];
    car: Car;

    constructor(props: InitialCircuitProps) {
        super(props.position);
        this.car = props.car;
        for (let i = 0; i < 20; i++) {
            const barrier = new Barrier({ position: { x: 0 + i * 50, y: 511 }, car: props.car });
            this.barriers.push(barrier);
        }
    }

    // Métodos
    update(delta: number): void {}

    draw(ctx: CanvasRenderingContext2D, delta: number): void {}
}
