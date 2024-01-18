"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePowerHeatLoss = exports.calculateHeatLoss = void 0;
const calculateHeatLoss = (floorArea, heatingFactor, insulationFactor) => floorArea * heatingFactor * insulationFactor;
exports.calculateHeatLoss = calculateHeatLoss;
const calculatePowerHeatLoss = (heatLoss, heatingDegreeDays) => heatLoss / heatingDegreeDays;
exports.calculatePowerHeatLoss = calculatePowerHeatLoss;
