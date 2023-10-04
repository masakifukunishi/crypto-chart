import axios from "axios";
import config from "config";
import { Model } from "mongoose";

import { KrakenConfig } from "../../../types/config.js";
import Ohlcv, { OhlcvDocument } from "../../../models/ohlcv.js";

class KrakenOhlcv {
  private krakenConfig: KrakenConfig;
  private period: number;
  private quoteAsset: string;
  private baseAsset: string;
  private pair: string;
  private dataLimit: number;
  private url: string;
  private ohlcvModel: Model<OhlcvDocument>;

  constructor(quoteAsset: string, baseAsset: string, dataLimit: number) {
    this.krakenConfig = config.get("kraken");
    this.period = this.krakenConfig.period.daily;
    this.quoteAsset = quoteAsset;
    this.baseAsset = baseAsset;
    this.pair = `${this.quoteAsset}${this.baseAsset}`;
    this.dataLimit = dataLimit;
    this.url = `${this.krakenConfig.apiUrl}/0/public/OHLC?pair=${this.pair}`;
    this.ohlcvModel = Ohlcv(`ohlcv_${this.quoteAsset}_${this.baseAsset}`);
  }

  async get(): Promise<OhlcvDocument[]> {
    return axios
      .get(this.url, {
        params: {
          interval: this.period,
        },
      })
      .then((response) => {
        const data = response.data.result[this.pair].slice(-this.dataLimit);
        const formattedData = data.map((d: number[]) => {
          return {
            // Kraken API returns time in seconds, but we want milliseconds
            targetTime: d[0] * 1000,
            open: d[1],
            high: d[2],
            low: d[3],
            close: d[4],
            volume: d[6],
          };
        });
        return formattedData;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async insert(data: OhlcvDocument | OhlcvDocument[]): Promise<void> {
    try {
      await this.ohlcvModel.insertMany(data);
    } catch (error) {
      console.log(error);
      console.log("Error inserting data");
    }
  }

  async updatePreviousData(data: OhlcvDocument): Promise<void> {
    const previousData = await this.ohlcvModel.findOne({ targetTime: data.targetTime });
    if (previousData) {
      await this.ohlcvModel.findOneAndUpdate({ targetTime: previousData.targetTime }, { $set: data }, { new: true });
    }
  }

  async findDataByCloseTime(targetTime: number): Promise<OhlcvDocument | null> {
    return this.ohlcvModel.findOne({ targetTime });
  }

  async updateDataByCloseTime(targetTime: number, newData: OhlcvDocument): Promise<OhlcvDocument | null> {
    return this.ohlcvModel.findOneAndUpdate({ targetTime }, { $set: newData }, { new: true });
  }
}

export default KrakenOhlcv;
