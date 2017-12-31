// @flow
import invariant from "invariant";

export default class Grid<T> {
  width: number;
  height: number;
  cells: Array<?T>;

  constructor(width: number, height: number, cells?: Array<?T>) {
    invariant(width > 0, "width must be positive");
    invariant(height > 0, "height must be positive");

    this.width = width;
    this.height = height;

    if (cells != null) {
      invariant(
        cells.length === width * height,
        "initial cell length must equal WxH"
      );

      this.cells = cells;
    } else {
      this.cells = new Array(width * height).fill(null);
    }
  }

  get length(): number {
    invariant(
      this.cells.length === this.width * this.height,
      "length must be consistent"
    );

    return this.cells.length;
  }

  coordsToIndex(x: number, y: number): number {
    invariant(x >= 0, "x must be greater than 0");
    invariant(x < this.width, "x must be less than width");
    invariant(y >= 0, "y must be greater than 0");
    invariant(y < this.height, "y must be less than height");

    return x + y * this.width;
  }

  wrapX(x: number): number {
    if (x < 0) return this.width + x % this.width;
    return x % this.width;
  }

  indexToXCoord(index: number): number {
    invariant(index >= 0, "index must be greater than 0");
    invariant(index < this.length, "index must be less than length");

    return index % this.width;
  }

  wrapY(y: number): number {
    if (y < 0) return this.height + y % this.height;
    return y % this.height;
  }

  indexToYCoord(index: number): number {
    invariant(index >= 0, "index must be greater than 0");
    invariant(index < this.length, "index must be less than length");

    return Math.floor(index / this.width);
  }

  forEach(
    callback: (cell: ?T, x: number, y: number, grid: Grid<T>) => void
  ): void {
    this.cells.forEach((cell, index) => {
      const x = this.indexToXCoord(index);
      const y = this.indexToYCoord(index);
      callback(cell, x, y, this);
    });
  }

  map<U>(
    callback: (cell: ?T, x: number, y: number, grid: Grid<T>) => ?U
  ): Grid<U> {
    const newCells: Array<?U> = new Array(this.length);

    this.forEach((cell, x, y) => {
      const index = this.coordsToIndex(x, y);
      newCells[index] = callback(cell, x, y, this);
    });

    return new Grid(this.width, this.height, newCells);
  }

  fill(value: ?T): Grid<T> {
    return this.map(() => value);
  }

  valueAtIndex(index: number): ?T {
    invariant(index >= 0, "index must be positive");
    invariant(index < this.length, "index must be less than length");

    return this.cells[index];
  }

  valueAtCoords(x: number, y: number, wrap?: boolean = false): ?T {
    const index = wrap
      ? this.coordsToIndex(this.wrapX(x), this.wrapY(y))
      : this.coordsToIndex(x, y);
    return this.valueAtIndex(index);
  }

  neighboursRoundCoord(x: number, y: number): Array<?T> {
    const deltas = [
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, -1],
      [1, -1]
    ];

    return deltas.map(([dx, dy]) =>
      this.valueAtCoords(this.wrapX(x + dx), this.wrapY(y + dy))
    );
  }

  areCoordsAtEdge(x: number, y: number): boolean {
    return x === 0 || x === this.width - 1 || y === 0 || y === this.height - 1;
  }
}
