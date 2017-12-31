// @flow
import invariant from "invariant";
import render from "./render";
import Grid from "./Grid";

import noise from "./steppers/noise";
import conway from "./steppers/conway";
import sin from "./steppers/sin";
import tree from "./steppers/tree";

function setup() {
  const canvas = document.querySelector("canvas");
  invariant(canvas instanceof HTMLCanvasElement, "canvas must be a canvas");

  const ctx = canvas.getContext("2d");
  invariant(ctx instanceof CanvasRenderingContext2D, "context is borked");

  run(ctx, tree);
}

type Stepper<T> = {
  initial: (number, number, Grid<T>) => ?T,
  step: (?T, number, number, Grid<T>, t: number) => ?T
};

function run(ctx: CanvasRenderingContext2D, stepper: Stepper<number>) {
  let grid: Grid<number> = new Grid(100, 100).map((c, x, y, g) =>
    stepper.initial(x, y, g)
  );
  render(grid, ctx);

  window.requestAnimationFrame(step);

  function step() {
    const t = window.performance.now();
    grid = grid.map((cell, x, y, g) => stepper.step(cell, x, y, g, t));
    render(grid, ctx);
    window.requestAnimationFrame(step);
  }
}

window.addEventListener("load", setup, true);
