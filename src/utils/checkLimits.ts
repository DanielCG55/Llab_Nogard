import { Point } from "./../types/Point";
import { canvas } from "./getCanvas";

export const checkLimits = (position: Point): boolean => {
  return (
    position.x > 50 &&
    position.x < canvas.width - 650 &&
    position.y > 110 &&
    position.y < canvas.height - 100
  );
};
