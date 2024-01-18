import { housesData } from "./houses";
import { IWeatherData } from "./types";

const weatherDataUrl =
  "https://063qqrtqth.execute-api.eu-west-2.amazonaws.com/v1/weather";

async function getHeatingInfo(location: string): Promise<IWeatherData> {
  const url = new URL(weatherDataUrl);
  url.searchParams.append("location", location);

  try {
    const response = await fetch(url, {
      headers: {
        "X-API-Key": "f661f74e-20a7-4e9f-acfc-041cfb846505",
      },
    });

    return await response.json();
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

async function getHousingFormData() {
  const allData = await Promise.all(
    housesData.map((houseData) => getHeatingInfo(houseData.designRegion))
  );

  console.log("house data \n", allData);
}

getHousingFormData();
