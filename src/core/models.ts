export interface Prefectures {
  [key: number]: {
    prefCode: number;
    prefName: string;
  };
}

export interface PrefecturesState {
  [key: number]: {
    prefName: string;
    checked: boolean;
  };
}

export type PopulationSeries = {
  year: number;
  value: number;
}[];

export type PopulationData = {
  prefName: string;
  values: {
    year: number;
    value: number;
  }[];
}[];

export interface ChartPoint {
  year: number;
  [prefName: string]: number;
}

export interface prefLabel {
  name: string;
  color?: string;
}
