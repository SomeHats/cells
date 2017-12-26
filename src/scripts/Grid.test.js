import Grid from "./Grid";
import { exec } from "child_process";
import { EPERM } from "constants";

describe("constructor", () => {
  test("sets width and height", () => {
    const grid = new Grid(10, 20);
    expect(grid.width).toBe(10);
    expect(grid.height).toBe(20);
  });

  test("length of cells is WxH", () => {
    const grid = new Grid(30, 50);
    expect(grid.cells.length).toBe(30 * 50);
  });

  test("initialises grid with nulls", () => {
    const grid = new Grid(30, 40);
    expect(grid.cells.every(cell => cell === null)).toBe(true);
  });

  test("accepts initial cell values", () => {
    const initialCells = new Array(10 * 20).fill(0);
    const grid = new Grid(10, 20, initialCells);
    expect(grid.cells).toBe(initialCells);
  });

  test("invalid", () => {
    expect(() => new Grid(0, 1)).toThrow();
    expect(() => new Grid(-1, 1)).toThrow();
    expect(() => new Grid(1, 0)).toThrow();
    expect(() => new Grid(1, -1)).toThrow();

    expect(() => new Grid(1, 1, [])).toThrow();
    expect(() => new Grid(1, 1, [1, 1])).toThrow();
  });
});

describe("coordsToIndex", () => {
  test("top row", () => {
    const grid = new Grid(5, 10);
    expect(grid.coordsToIndex(0, 0)).toBe(0);
    expect(grid.coordsToIndex(1, 0)).toBe(1);
    expect(grid.coordsToIndex(4, 0)).toBe(4);
  });

  test("left column", () => {
    const grid = new Grid(5, 10);
    expect(grid.coordsToIndex(0, 1)).toBe(5);
    expect(grid.coordsToIndex(0, 2)).toBe(10);
    expect(grid.coordsToIndex(0, 6)).toBe(30);
  });

  test("wrap-around", () => {
    const grid = new Grid(5, 10);
    expect(grid.coordsToIndex(1, 1)).toBe(6);
    expect(grid.coordsToIndex(2, 2)).toBe(12);
    expect(grid.coordsToIndex(3, 3)).toBe(18);
    expect(grid.coordsToIndex(4, 9)).toBe(49);
  });

  test("out of bounds", () => {
    const grid = new Grid(5, 10);
    expect(() => grid.coordsToIndex(-1, 0)).toThrow();
    expect(() => grid.coordsToIndex(0, -1)).toThrow();
    expect(() => grid.coordsToIndex(5, 0)).toThrow();
    expect(() => grid.coordsToIndex(0, 10)).toThrow();
  });

  test("round trip", () => {
    const grid = new Grid(5, 10);
    grid.cells.forEach((v, index) => {
      const x = grid.indexToXCoord(index);
      const y = grid.indexToYCoord(index);
      expect(grid.coordsToIndex(x, y)).toBe(index);
    });
  });
});

describe("indexToXCoord", () => {
  test("values", () => {
    const grid = new Grid(5, 10);
    expect(grid.indexToXCoord(0)).toBe(0);
    expect(grid.indexToXCoord(4)).toBe(4);
    expect(grid.indexToXCoord(5)).toBe(0);
    expect(grid.indexToXCoord(16)).toBe(1);
  });

  test("out of bounds", () => {
    const grid = new Grid(5, 10);
    expect(() => grid.indexToXCoord(-1)).toThrow();
    expect(() => grid.indexToXCoord(50)).toThrow();
  });
});

describe("indexToYCoord", () => {
  test("values", () => {
    const grid = new Grid(5, 10);
    expect(grid.indexToYCoord(0)).toBe(0);
    expect(grid.indexToYCoord(4)).toBe(0);
    expect(grid.indexToYCoord(5)).toBe(1);
    expect(grid.indexToYCoord(16)).toBe(3);
  });

  test("out of bounds", () => {
    const grid = new Grid(5, 10);
    expect(() => grid.indexToXCoord(-1)).toThrow();
    expect(() => grid.indexToXCoord(50)).toThrow();
  });
});

describe("map", () => {
  test("returns a new grid", () => {
    const grid1 = new Grid(10, 10);
    const grid2 = grid1.map(cell => 5);
    expect(grid1).not.toBe(grid2);
  });

  test("can return an identical grid", () => {
    const grid1 = new Grid(10, 10);
    const grid2 = grid1.map(cell => cell);
    expect(grid1).toEqual(grid2);
  });

  test("can update all values", () => {
    const grid1 = new Grid(2, 2, [1, 2, 3, 4]);
    const grid2 = grid1.map(cell => cell * cell);
    const expected = new Grid(2, 2, [1, 4, 9, 16]);

    expect(grid2).toEqual(expected);
  });
});
