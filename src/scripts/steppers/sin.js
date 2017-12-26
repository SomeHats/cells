// @flow
import Grid from "../Grid";

export default {
  initial() {
    return 0;
  },

  step(
    cell: ?number,
    x: number,
    y: number,
    grid: Grid<number>,
    t: number
  ): number {
    const vMin = x / 10 + t / 300;
    const vMax = (x + 1) / 10 + t / 300;
    const h = grid.height / 2;

    const y1 = h + Math.floor(h * Math.sin(vMin));
    const y2 = h + Math.floor(h * Math.sin(vMax));
    const yMin = Math.min(y1, y2);
    const yMax = Math.max(y1, y2);

    return yMin <= y && y <= yMax ? 1 : 0;
  }
};
