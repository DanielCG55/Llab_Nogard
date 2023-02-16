import { Actor } from "./Actor";
import { Ammo } from "./Ammo";

export class AmmoManager extends Actor {
    // This will hold all alive bullets in game
    ammo: Ammo[];
    player: Actor;
    constructor(player: Actor) {
        super();

        // Save player to pass it to all ammos in creation
        this.player = player;
        this.ammo = [];
    }

    addBullet() {
        const bullet = new Ammo({ player: this.player });
        this.ammo.push(bullet);
    }

    getAmmoActors() {
        return this.ammo;
    }

    keyboardEventDown(key: string): void {
        if (key == " ") {
            this.addBullet();
        }
    }

    update(delta: number): void {
        // Delete expired bullets on each frame
        const notExpiredBullets = this.ammo.filter((a) => {
            const bullet = a as Ammo;
            return !bullet.expired;
        });

        this.ammo = notExpiredBullets;
    }
}
