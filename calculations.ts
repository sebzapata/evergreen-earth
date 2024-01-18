const calculateHeatLoss = (
  floorArea: number,
  heatingFactor: number,
  insulationFactor: number
) => floorArea * heatingFactor * insulationFactor;

const calculatePowerHeatLoss = (heatLoss: number, heatingDegreeDays: number) =>
  heatLoss / heatingDegreeDays;
