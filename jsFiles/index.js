"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const calculations_1 = require("./calculations");
const heatPumps_1 = require("./heatPumps");
const houses_1 = require("./houses");
const weatherDataUrl = "https://063qqrtqth.execute-api.eu-west-2.amazonaws.com/v1/weather";
function getHeatingDegreeDays(location) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(weatherDataUrl);
        url.searchParams.append("location", location);
        try {
            const response = yield fetch(url, {
                headers: {
                    "X-API-Key": "f661f74e-20a7-4e9f-acfc-041cfb846505",
                },
            });
            if (response.ok) {
                return yield response.json();
            }
            return {
                location: {
                    location,
                    unsuccessful: true,
                },
            };
        }
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    });
}
function getHousingFormData() {
    return __awaiter(this, void 0, void 0, function* () {
        const allHeatingDegreeDays = yield Promise.all(houses_1.housesData.map((houseData) => getHeatingDegreeDays(houseData.designRegion)));
        const formObject = {};
        houses_1.housesData.forEach((houseData) => {
            formObject[houseData.designRegion] = {
                submissionId: houseData.submissionId,
                heatingLoss: (0, calculations_1.calculateHeatLoss)(houseData.floorArea, houseData.heatingFactor, houseData.insulationFactor),
            };
        });
        allHeatingDegreeDays.forEach((heatingDegreeDay) => {
            const { location } = heatingDegreeDay;
            // TypeScript 'should' be able to infer which type object is being handled below,
            // but I didn't want to spend too much time on removing the error, when the code still runs as expected.
            if (location.unsuccessful) {
                formObject[location.location] = Object.assign(Object.assign({}, formObject[location.location]), { warning: "Could not find design region" });
            }
            else {
                const heatLoss = formObject[location.location].heatingLoss;
                const powerHeatLoss = (0, calculations_1.calculatePowerHeatLoss)(heatLoss, location.degreeDays);
                const suitableHeatPumps = heatPumps_1.heatPumps.filter((heatPump) => heatPump.outputCapacity >= powerHeatLoss);
                const closestHeatPump = suitableHeatPumps.reduce((prev, curr) => prev.outputCapacity < curr.outputCapacity ? prev : curr);
                const costBreakdown = closestHeatPump.costs;
                const installationCost = closestHeatPump.costs.reduce((accumulator, currentValue) => accumulator + currentValue.cost, 0);
                const installationCostWithVat = installationCost * 1.05;
                formObject[location.location] = Object.assign(Object.assign({}, formObject[location.location]), { designRegion: location.location, powerHeatLoss, recommendedHeatPump: closestHeatPump.label, costBreakdown, totalCost: installationCostWithVat });
            }
        });
        console.log(JSON.stringify(formObject, null, 2));
    });
}
getHousingFormData();
