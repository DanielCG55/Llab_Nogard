import { Point } from "../types/Point";

export const distance = (obj1Position: Point, obj2Position: Point) => {
  return Math.sqrt(
    Math.pow(obj1Position.x - obj2Position.x, 2) +
      Math.pow(obj1Position.y - obj2Position.y, 2)
  );
};
