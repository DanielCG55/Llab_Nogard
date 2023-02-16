import { checkLimits } from "../utils/checkLimits";
import { Point } from "../types/Point";
import { Size } from "../types/Size";
import { convertAngleToRad } from "../utils/convertAngleToRad";
import { Actor } from "./Actor";

export class BackgroundMusic extends Actor {
    // Atributos
    music: HTMLAudioElement;

    constructor() {
        super({ x: 0, y: 0 });
        this.music = new Audio();
        this.music.src = "backgroundMusic.mp3";

        //Audio Configuration
        this.music.volume = 0.3;
        this.music.loop = false;
        this.music.autoplay = true;
        this.music.play();
    }
}
