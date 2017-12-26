// @flow
import invariant from "invariant";
import render from "./render";
import Grid from "./Grid";

import noise from "./steppers/noise";
import conway from "./steppers/conway";
import sin from "./steppers/sin";

function setup() {
  const canvas = document.querySelector("canvas");
  invariant(canvas instanceof HTMLCanvasElement, "canvas must be a canvas");

  const ctx = canvas.getContext("2d");
  invariant(ctx instanceof CanvasRenderingContext2D, "context is borked");

  run(ctx, sin);
}

type Stepper<T> = {
  initial: (?T, number, number, Grid<T>) => ?T,
  step: (?T, number, number, Grid<T>, t: number) => ?T
};

function run(ctx: CanvasRenderingContext2D, stepper: Stepper<number>) {
  let grid: Grid<number> = new Grid(100, 100).map(stepper.initial);
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
