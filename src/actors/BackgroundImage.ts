export class BackgroundImage {
    image: HTMLImageElement;
    title: HTMLImageElement;

    constructor() {
        this.image = new Image();
        this.image.src = "cellarena.png";
        this.title = new Image();
        this.title.src = "title.png";
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, -210, 55);
        ctx.drawImage(this.title, 250, 50, 600, 100);
    }
}
