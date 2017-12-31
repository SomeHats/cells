// @flow
import Grid from "../Grid";
import { chance } from "../lib/util";

let i = 0;
const EMPTY = i++;
const TRUNK = i++;
const L0_GROW_UP = i++;
const L1_GROW_UP_LEFT = i++;
const L1_GROW_UP_RIGHT = i++;
const L2_GROW_LEFT = i++;
const L2_GROW_RIGHT = i++;
const L2_GROW_UP = i++;

const GROW_CHANCE = 0.5;
const CHANGE_DIRECTION_CHANCE = 0.005;
const GROW_STOP_CHANCE = 0.01;

const OFFSHOOT_GROW_STOP = 3;
const OFFSHOOT_GROW_CHANCE = 0.4;
const L2_OFFSHOOT_GROW_STOP = 4;
const L2_OFFSHOOT_GROW_CHANCE = 0.2;

export default {
  initial(x: number, y: number, grid: Grid<number>): number {
    if (y === grid.height - 1 && x === Math.floor(grid.width / 2)) {
      return L0_GROW_UP;
    }
    return EMPTY;
  },

  step(cell: ?number, x: number, y: number, grid: Grid<number>): ?number {
    const below = grid.valueAtCoords(x, y + 1, true);
    const above = grid.valueAtCoords(x, y - 1, true);
    const left = grid.valueAtCoords(x - 1, y, true);
    const right = grid.valueAtCoords(x + 1, y, true);
    const belowLeft = grid.valueAtCoords(x - 1, y + 1, true);
    const belowRight = grid.valueAtCoords(x + 1, y + 1, true);
    const aboveLeft = grid.valueAtCoords(x - 1, y - 1, true);
    const aboveRight = grid.valueAtCoords(x + 1, y - 1, true);

    if (y === 0 || x === 0 || x === grid.width - 1) return EMPTY;

    // grow-up cells spread upwards
    if (cell === EMPTY && below === L0_GROW_UP && chance(GROW_CHANCE)) {
      return L0_GROW_UP;
    }

    // if grow-up cells have something above them,
    // they might start growing in a different direction
    if (
      cell === L0_GROW_UP &&
      above !== EMPTY &&
      chance(CHANGE_DIRECTION_CHANCE)
    ) {
      return chance(0.5) ? L1_GROW_UP_LEFT : L1_GROW_UP_RIGHT;
    }

    // eventually they stop growing and become trunk
    if (cell === L0_GROW_UP && chance(GROW_STOP_CHANCE)) {
      return TRUNK;
    }

    /// L1 OFFSHOOTS:
    // grow up and right:
    if (
      cell === EMPTY &&
      below === EMPTY &&
      belowLeft === L1_GROW_UP_RIGHT &&
      chance(GROW_CHANCE * OFFSHOOT_GROW_CHANCE)
    ) {
      return L1_GROW_UP_RIGHT;
    }

    // grow up and left:
    if (
      cell === EMPTY &&
      below === EMPTY &&
      belowRight === L1_GROW_UP_LEFT &&
      chance(GROW_CHANCE * OFFSHOOT_GROW_CHANCE)
    ) {
      return L1_GROW_UP_LEFT;
    }

    // change offshot growth dir to spawn L2 offshoots
    if (
      ((cell === L1_GROW_UP_LEFT && aboveLeft !== EMPTY) ||
        (cell === L1_GROW_UP_RIGHT && aboveRight !== EMPTY)) &&
      chance(CHANGE_DIRECTION_CHANCE)
    ) {
      const horiz = cell === L1_GROW_UP_LEFT ? L2_GROW_LEFT : L2_GROW_RIGHT;
      return chance(0.5) ? horiz : L2_GROW_UP;
    }

    // Stop offshoot growth
    if (
      (cell === L1_GROW_UP_LEFT || cell === L1_GROW_UP_RIGHT) &&
      chance(GROW_STOP_CHANCE * OFFSHOOT_GROW_STOP)
    ) {
      return TRUNK;
    }

    /// L2 OFFSHOOTS
    // grow up
    if (
      cell === EMPTY &&
      below === L2_GROW_UP &&
      chance(GROW_CHANCE * L2_OFFSHOOT_GROW_CHANCE)
    ) {
      return L2_GROW_UP;
    }
    if (
      cell === EMPTY &&
      right === L2_GROW_LEFT &&
      chance(GROW_CHANCE * L2_OFFSHOOT_GROW_CHANCE)
    ) {
      return L2_GROW_LEFT;
    }
    if (
      cell === EMPTY &&
      left === L2_GROW_RIGHT &&
      chance(GROW_CHANCE * L2_OFFSHOOT_GROW_CHANCE)
    ) {
      return L2_GROW_RIGHT;
    }

    // stop l2 offshoot growth
    if (
      (cell === L2_GROW_UP ||
        cell === L2_GROW_RIGHT ||
        cell === L2_GROW_LEFT) &&
      chance(GROW_STOP_CHANCE * L2_OFFSHOOT_GROW_STOP)
    ) {
      return TRUNK;
    }

    // grow
    /* // the trunk slowly gets wider from the base
    if (
      cell === EMPTY && // trunk grows into existing empty space
      (left === TRUNK || right === TRUNK) // trunk grows next to other trunk - so it gets wider
    ) {
      // at the bottom, trunk widens VERY slowly
      if (y === grid.height - 1 && chance(0.001)) return TRUNK;

      // above the base trunk, it gets wider a bit faster
      if (below === TRUNK && chance(0.05)) return TRUNK;
    } */

    return cell;
  }
};
