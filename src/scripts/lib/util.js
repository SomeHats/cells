// @flow
export const constrain = (a: number, b: number, n: number): number => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.min(max, Math.max(min, n));
};

export const chance = (chance: number): boolean => {
  return Math.random() < constrain(0, 1, chance);
};
