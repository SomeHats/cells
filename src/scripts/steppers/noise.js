export default {
  initial() {
    return 0;
  },
  step(): number {
    return Math.random() < 0.5 ? 0 : 1;
  }
};
