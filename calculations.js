"use strict";
const calculateHeatLoss = (floorArea, heatingFactor, insulationFactor) => floorArea * heatingFactor * insulationFactor;
const calculatePowerHeatLoss = (heatLoss, heatingDegreeDays) => heatLoss / heatingDegreeDays;
