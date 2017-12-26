// @flow
import Grid from "./grid";

const colours = [
  "#000000",
  "#FFFFFF",
  "#ff1744",
  "#1DE9B6",
  "#F50057",
  "#00E676",
  "#D500F9",
  "#76FF03",
  "#651FFF",
  "#C6FF00",
  "#3D5AFE",
  "#FFEA00",
  "#2979FF",
  "#FFC400",
  "#00B0FF",
  "#FF9100",
  "#00E5FF",
  "#FF3D00"
];

export default function render(
  grid: Grid<number>,
  ctx: CanvasRenderingContext2D
): void {
  const canvas = ctx.canvas;

  if (canvas.width !== grid.width || canvas.height !== grid.height) {
    canvas.width = grid.width;
    canvas.height = grid.height;
    canvas.style.width = `${grid.width * 4}px`;
    canvas.style.height = `${grid.height * 4}px`;
  } else {
    ctx.clearRect(0, 0, grid.width, grid.height);
  }

  grid.forEach((cell, x, y) => {
    ctx.fillStyle = cell == null ? "#777" : colours[cell % colours.length];
    ctx.fillRect(x, y, 1, 1);
  });
}
