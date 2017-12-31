import { constrain } from "./util";

describe("constrain", () => {
  test("basic", () => {
    expect(constrain(1, 10, 2)).toBe(2);
    expect(constrain(1, 10, 0)).toBe(1);
    expect(constrain(1, 10, 11)).toBe(10);
  });

  test("wrong order", () => {
    expect(constrain(10, 1, 2)).toBe(2);
    expect(constrain(10, 1, 0)).toBe(1);
    expect(constrain(10, 1, 11)).toBe(10);
  });
});
