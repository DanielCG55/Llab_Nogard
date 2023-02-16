import { Point } from "../types/Point";
import { distance } from "../utils/distance";
import { Actor } from "./Actor";
import { AmmoManager } from "./AmmoManager";
import { Enemy } from "./Enemy";

interface InitialEnemyManagerProps {
    position?: Point;
    ammoManager: AmmoManager;
}

export class EnemyManager extends Actor {
    //Atributos
    enemies: Enemy[] = [];
    completed: boolean = false;
    ammoManager: AmmoManager;
    nextEnemyToTouch?: number = 1;
    currentEnemyTouching?: number = undefined;
    dead: HTMLAudioElement;

    constructor(props: InitialEnemyManagerProps) {
        super({ x: 800, y: 800 });
        this.ammoManager = props.ammoManager;
        this.dead = new Audio();
        this.dead.src = "celljr.wav";
        this.dead.volume = 1;

        let time = 100;
        let enemy: Enemy;
        let createEnemies = () => {
            for (let i = 1; i > 0; i--) {
                enemy = new Enemy({
                    position: {
                        x: Math.random() * (1000 - 600) + 600,
                        y: Math.random() * (500 - 100) + 100,
                    },
                    size: { w: 70, h: 70 },
                });
                this.enemies.push(enemy);
            }
        };

        setInterval(createEnemies, 700);
        setInterval(() => time--);
    }

    getEnemyActors() {
        return this.enemies;
    }
    // Métodos
    update(delta: number): void {
        let aliveEnemies = this.enemies.filter((a) => {
            const enemies = a as Enemy;
            return !enemies.expired;
        });
        this.enemies = aliveEnemies;

        this.enemies.map((a) => {
            this.ammoManager.getAmmoActors().map((b) => {
                if (
                    distance(
                        { x: a.position.x, y: a.position.y },
                        { x: b.position.x, y: b.position.y }
                    ) <= 40
                ) {
                    a.expired = true;
                    b.expired = true;
                    this.dead.play();
                }
            });
        });

        //TODO: Para completar el juego
        //  Comprueba que todos los Enemy han sido tocados
        let countEnemy = 0;
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].expired) countEnemy++;
        }
        if (countEnemy == this.enemies.length) this.completed = true;

        //Only draw alive enemies
        const notExpiredEnemies = this.enemies.filter((a) => {
            const enemy = a as Enemy;
            return !enemy.expired;
        });

        this.enemies = notExpiredEnemies;
    }

    draw(ctx: CanvasRenderingContext2D, delta: number): void {
        ctx.translate(this.position.x, this.position.y);
        ctx.font = "35px Consolas";
        ctx.fillStyle = "#000";
        ctx.fillText(`CURRENT:${this.currentEnemyTouching}`, 0, 0);
        ctx.fillText(`NEXT:${this.nextEnemyToTouch}`, 0, 50);
    }

    keyboardEventDown(key: string): void {
        switch (key) {
            case " ":
                break;
        }
    }
}
