const imagesSrc: string = "src/assets/img/";

export class BackgroundImage {
  image: HTMLImageElement;

  constructor() {
    this.image = new Image();
    this.image.src = imagesSrc + "cellarena.png";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, -210, 55);
  }
}
