import { calculateHeatLoss, calculatePowerHeatLoss } from "./calculations";

describe("calculateHeatLoss", () => {
  test("calculates heat loss correctly", () => {
    expect(calculateHeatLoss(100, 50, 10)).toBe(50000);
  });

  test("calculates heat loss if some numbers are 0", () => {
    expect(calculateHeatLoss(100, 0, 10)).toBe(0);
  });
});

describe("calculatePowerHeatLoss", () => {
  test("calculates power heat loss correctly", () => {
    expect(calculatePowerHeatLoss(30, 10)).toBe(3);
  });

  test("calculates power heat loss if some numbers are 0", () => {
    expect(calculatePowerHeatLoss(30, 0)).toBe(0);
  });
});
