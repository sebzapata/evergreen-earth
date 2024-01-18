"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const houses_1 = require("./houses");
const weatherDataUrl = "https://063qqrtqth.execute-api.eu-west-2.amazonaws.com/v1/weather";
async function getHeatingInfo(location) {
    const url = new URL(weatherDataUrl);
    url.searchParams.append("location", location);
    try {
        const response = await fetch(url, {
            headers: {
                "X-API-Key": "f661f74e-20a7-4e9f-acfc-041cfb846505",
            },
        });
        return await response.json();
    }
    catch (error) {
        throw new Error(`Error: ${error}`);
    }
}
async function getHousingFormData() {
    const allData = await Promise.all(houses_1.housesData.map((houseData) => getHeatingInfo(houseData.designRegion)));
    console.log("house data \n", allData);
}
getHousingFormData();
