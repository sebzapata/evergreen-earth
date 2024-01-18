export const calculateHeatLoss = (
  floorArea: number,
  heatingFactor: number,
  insulationFactor: number
) => floorArea * heatingFactor * insulationFactor;

export const calculatePowerHeatLoss = (
  heatLoss: number,
  heatingDegreeDays: number
) => heatLoss / heatingDegreeDays;
