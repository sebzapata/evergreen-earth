export interface IHouse {
  submissionId: string;
  designRegion: string;
  floorArea: number;
  age: string;
  heatingFactor: number;
  insulationFactor: number;
}

export interface IHeatPump {
  label: string;
  outputCapacity: number;
  costs: {
    label: string;
    cost: number;
  }[];
}

export interface ISubmission {
  submissionId: string;
  estimatedHeatLoss: number;
  designRegion: string;
  powerHeatLoss: number;
  recommendedHeatPump: string;
  costBreakdown: {
    label: string;
    cost: string;
  }[];
  totalCost: number;
}

export interface IWeatherData {
  location: {
    location: string;
    degreeDays: number;
    groundTemp: number;
    postcode: string;
    lat: number;
    lng: number;
  };
}
