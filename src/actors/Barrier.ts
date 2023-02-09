import { converAngleToRad } from '../utils/convertAngleToRad';
import { Point } from './../types/Point';
import { Actor } from './Actor';
import { Car } from './Car';

interface InitialBarrierProps {
    position: Point;
    car: Car;
    color?: string;
    touched?: boolean;
    distance?: number;
}

export class Barrier extends Actor {
    //Atributos
    color: string;
    car: Car;
    touched?: boolean;
    distance?: number;
    barrierLength: number = 35;

    constructor(props: InitialBarrierProps) {
        super(props.position);
        this.car = props.car;
        this.color = props.color || 'blue';
    }

    update(delta: number): void {
        this.distance = Math.sqrt(Math.pow(this.position.x - this.car.position.x, 2) + Math.pow(this.position.y - this.car.position.y, 2));

        if(this.distance <= this.barrierLength) this.touched = true;
    }

    // Métodos
    draw(ctx: CanvasRenderingContext2D, delta: number): void {
        ctx.translate(this.position.x, this.position.y);
        ctx.fillStyle = !this.touched ? this.color : 'pink';
        ctx.strokeStyle = !this.touched ? this.color : 'pink';
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, converAngleToRad(360));
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-this.barrierLength, 0);
        ctx.lineTo(this.barrierLength, 0);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = '#000';
        ctx.font = '30px Consolas';
        ctx.fillText(`${this.distance?.toFixed(0)}`, -20, 35);
    }
}
