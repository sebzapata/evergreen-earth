import { calculateHeatLoss, calculatePowerHeatLoss } from "./calculations";
import { heatPumps } from "./heatPumps";
import { housesData } from "./houses";
import { IFinalForm, IWeatherData, IWeatherDataFail } from "./types";

const weatherDataUrl =
  "https://063qqrtqth.execute-api.eu-west-2.amazonaws.com/v1/weather";

async function getHeatingDegreeDays(
  location: string
): Promise<IWeatherData | IWeatherDataFail> {
  const url = new URL(weatherDataUrl);
  url.searchParams.append("location", location);

  try {
    const response = await fetch(url, {
      headers: {
        "X-API-Key": "f661f74e-20a7-4e9f-acfc-041cfb846505",
      },
    });

    if (response.ok) {
      return await response.json();
    }

    return {
      location: {
        location,
        unsuccessful: true,
      },
    };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

async function getHousingFormData() {
  const allHeatingDegreeDays = await Promise.all(
    housesData.map((houseData) => getHeatingDegreeDays(houseData.designRegion))
  );

  const formObject: IFinalForm = {};

  housesData.forEach((houseData) => {
    formObject[houseData.designRegion] = {
      submissionId: houseData.submissionId,
      heatingLoss: calculateHeatLoss(
        houseData.floorArea,
        houseData.heatingFactor,
        houseData.insulationFactor
      ),
    };
  });

  allHeatingDegreeDays.forEach((heatingDegreeDay) => {
    const { location } = heatingDegreeDay;

    // TypeScript 'should' be able to infer which type object is being handled below,
    // but I didn't want to spend too much time on removing the error, when the code still runs as expected.

    if (heatingDegreeDay.location.unsuccessful) {
      formObject[location.location] = {
        ...formObject[location.location],
        warning: "Could not find design region",
      };
    } else {
      const heatLoss = formObject[location.location].heatingLoss;

      const powerHeatLoss = calculatePowerHeatLoss(
        heatLoss,
        location.degreeDays
      );

      const suitableHeatPumps = heatPumps.filter(
        (heatPump) => heatPump.outputCapacity >= powerHeatLoss
      );

      const closestHeatPump = suitableHeatPumps.reduce((prev, curr) =>
        prev.outputCapacity < curr.outputCapacity ? prev : curr
      );

      const costBreakdown = closestHeatPump.costs;

      const installationCost = closestHeatPump.costs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.cost,
        0
      );

      const installationCostWithVat = installationCost * 1.05;

      formObject[location.location] = {
        ...formObject[location.location],
        designRegion: location.location,
        powerHeatLoss,
        recommendedHeatPump: closestHeatPump.label,
        costBreakdown,
        totalCost: installationCostWithVat,
      };
    }
  });

  console.log(JSON.stringify(formObject, null, 2));
}

getHousingFormData();
