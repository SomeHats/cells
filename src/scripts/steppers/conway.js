// @flow
import Grid from "../Grid";

export default {
  initial(): number {
    return Math.random() < 0.1 ? 1 : 0;
  },

  step(cell: ?number, x: number, y: number, grid: Grid<number>): ?number {
    const neighbours = grid.neighboursRoundCoord(x, y);
    const liveNeighbours = neighbours.filter(v => !!v).length;

    // 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation
    if (cell && liveNeighbours < 2) return 0;

    // 2. Any live cell with more than three live neighbours dies, as if by overpopulation
    if (cell && liveNeighbours > 3) return 0;

    // 3. Any live cell with two or three live neighbours lives on to the next generation
    if (cell) return 1;

    // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction
    if (!cell && liveNeighbours === 3) return 1;

    // everything else is dead
    return 0;
  }
};
