// @flow
import invariant from "invariant";
import render from "./render";
import Grid from "./Grid";

import noise from "./steppers/noise";
import conway from "./steppers/conway";

function setup() {
  const canvas = document.querySelector("canvas");
  invariant(canvas instanceof HTMLCanvasElement, "canvas must be a canvas");

  const ctx = canvas.getContext("2d");
  invariant(ctx instanceof CanvasRenderingContext2D, "context is borked");

  run(ctx, conway);
}

type Stepper<T> = {
  initial: (?T, number, number, Grid<T>) => ?T,
  step: (?T, number, number, Grid<T>) => ?T
};

function run(ctx: CanvasRenderingContext2D, stepper: Stepper<number>) {
  let grid: Grid<number> = new Grid(100, 100).map(stepper.initial);
  render(grid, ctx);

  window.requestAnimationFrame(step);

  function step() {
    grid = grid.map(stepper.step);
    render(grid, ctx);
    window.requestAnimationFrame(step);
  }
}

window.addEventListener("load", setup, true);
