export const calculateHeatLoss = (
  floorArea: number,
  heatingFactor: number,
  insulationFactor: number
) => floorArea * heatingFactor * insulationFactor;

export const calculatePowerHeatLoss = (
  heatLoss: number,
  heatingDegreeDays: number
) => {
  if (heatingDegreeDays === 0) {
    return 0;
  }

  return heatLoss / heatingDegreeDays;
};
