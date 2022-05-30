/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from "axios";
import { PopulationSeries, Prefectures } from "./models";

const REACT_APP_RESAS_API_KEY = process.env.REACT_APP_RESAS_API_KEY;
const baseUrl = "https://opendata.resas-portal.go.jp/api/v1/";
const prefecturesUrl = baseUrl + "prefectures";
const prefecturePopulationUrl = baseUrl + "population/composition/perYear";

export const getPrefectures = async (): Promise<Prefectures | Error> => {
  try {
    if (!REACT_APP_RESAS_API_KEY) {
      return new Error("RESAS_API_KEY is not defined");
    }
    return await axios
      .get(prefecturesUrl, {
        headers: { "X-API-KEY": REACT_APP_RESAS_API_KEY }
      })
      .then(res => {
        if (res.data && res.data.result) {
          return res.data.result as Prefectures;
        }
        return new Error("Server Error");
      });
  } catch (err) {
    return new Error("Server Error");
  }
};

export const getPrefecturePopulation = async (
  prefCode: number
): Promise<PopulationSeries | Error> => {
  try {
    if (!REACT_APP_RESAS_API_KEY) {
      return new Error("RESAS_API_KEY is not defined");
    }
    return await axios
      .get(`${prefecturePopulationUrl}?cityCode=-&prefCode=${prefCode}`, {
        headers: { "X-API-KEY": REACT_APP_RESAS_API_KEY }
      })
      .then(res => {
        if (
          res.data &&
          res.data.result &&
          res.data.result.data &&
          res.data.result.data[0] &&
          res.data.result.data[0].data
        ) {
          return res.data.result.data[0].data as PopulationSeries;
        }
        return new Error("Server Error");
      });
  } catch (err) {
    return new Error("Server Error");
  }
};
