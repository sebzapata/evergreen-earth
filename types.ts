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
  heatingLoss: number;
  designRegion: string;
  powerHeatLoss: number;
  recommendedHeatPump: string;
  costBreakdown: {
    label: string;
    cost: number;
  }[];
  totalCost: number;
}

export interface ISubmissionWithoutRegion {
  submissionId: string;
  heatingLoss: number;
  warning?: string;
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

export interface IWeatherDataFail {
  location: {
    location: string;
    unsuccessful: boolean;
  };
}

export interface IFinalForm {
  [location: string]: ISubmission | ISubmissionWithoutRegion;
}
