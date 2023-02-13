import { Point } from "../types/Point";
import { Actor } from "./Actor";
import { Barrier } from "./Barrier";
import { Gohan } from "./Gohan";

interface InitialCircuitProps {
  position?: Point;
  player: Gohan;
  linkedBarrier?: Barrier;
}

export class Circuit extends Actor {
  //Atributos
  barriers: Barrier[] = [];
  completed: boolean = false;
  player: Gohan;
  nextBarrierToTouch?: number = 1;
  currentBarrierTouching?: number = undefined;

  constructor(props: InitialCircuitProps) {
    super({ x: 800, y: 800 });
    this.player = props.player;
    let barrier: Barrier | undefined;

    for (let i = 20; i > 0; i--) {
      barrier = new Barrier({
        position: {
          x: Math.random() * (1000 - 600) + 600,
          y: Math.random() * (500 - 100) + 100,
        },
        angle: 0,
        player: props.player,
        linkedBarrier: barrier,
        size: { w: 70, h: 70 },
      });

      this.barriers.push(barrier);
      console.log(barrier, "creado");
    }
  }

  // Métodos
  update(delta: number): void {
    // Comprueba que todos los Barrier han sido tocados
    let countBarrier = 0;
    for (let i = 0; i < this.barriers.length; i++) {
      if (this.barriers[i].touched) countBarrier++;
    }
    if (countBarrier == this.barriers.length) this.completed = true;

    // Comprueba el orden de los Barrier
    for (let i = 0; i < this.barriers.length; i++) {
      const currentBarrier = this.barriers[i];
      if (!currentBarrier.touched) break;
      this.nextBarrierToTouch = i + 1;
    }

    let currentIndex = this.barriers.findIndex((e) => e.thouching);

    if (typeof this.currentBarrierTouching == "undefined") {
      this.currentBarrierTouching = 0;
    }

    if (currentIndex != -1) {
      this.currentBarrierTouching = currentIndex;
    }

    // Reinicio si recorre el orden mal
    if (
      this.currentBarrierTouching != 0 &&
      this.nextBarrierToTouch != this.currentBarrierTouching + 1
    ) {
      this.currentBarrierTouching = undefined;
      this.player.restart();
      this.barriers.forEach((barrier) => barrier.restart());
    }
  }

  draw(ctx: CanvasRenderingContext2D, delta: number): void {
    ctx.translate(this.position.x, this.position.y);
    ctx.font = "35px Consolas";
    ctx.fillStyle = "#000";
    ctx.fillText(`CURRENT:${this.currentBarrierTouching}`, 0, 0);
    ctx.fillText(`NEXT:${this.nextBarrierToTouch}`, 0, 50);
  }
}
