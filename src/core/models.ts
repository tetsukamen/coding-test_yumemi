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
