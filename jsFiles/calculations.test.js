"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculations_1 = require("./calculations");
describe("calculateHeatLoss", () => {
    test("calculates heat loss correctly", () => {
        expect((0, calculations_1.calculateHeatLoss)(100, 50, 10)).toBe(50000);
    });
    test("calculates heat loss if some numbers are 0", () => {
        expect((0, calculations_1.calculateHeatLoss)(100, 0, 10)).toBe(0);
    });
});
describe("calculatePowerHeatLoss", () => {
    test("calculates power heat loss correctly", () => {
        expect((0, calculations_1.calculatePowerHeatLoss)(30, 10)).toBe(3);
    });
    test("calculates power heat loss if some numbers are 0", () => {
        expect((0, calculations_1.calculatePowerHeatLoss)(30, 0)).toBe(0);
    });
});
