export interface Prefectures {
  [key: number]: {
    prefCode: number;
    prefName: string;
  };
}

export type PopulationSeries = {
  year: number;
  value: number;
}[];
