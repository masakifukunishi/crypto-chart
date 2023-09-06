import axios from "axios";
import config from "config";
import { Model } from "mongoose";

import { CryptowatchConfig } from "../../../types/config.js";
import Ohlcv, { OhlcvDocument } from "../../../models/ohlcv.js";

class CryptowatchOhlcv {
  private cryptowatchConfig: CryptowatchConfig;
  private period: number;
  private exchange: string;
  private quoteAsset: string;
  private baseAsset: string;
  private pair: string;
  private dataLimit: number;
  private url: string;
  private ohlcvModel: Model<OhlcvDocument>;

  constructor(exchange: string, quoteAsset: string, baseAsset: string, dataLimit: number) {
    this.cryptowatchConfig = config.get("cryptowatch");
    this.period = this.cryptowatchConfig.period.daily;
    this.exchange = exchange;
    this.quoteAsset = quoteAsset;
    this.baseAsset = baseAsset;
    this.pair = `${this.quoteAsset}${this.baseAsset}`;
    this.dataLimit = dataLimit;
    this.url = `${this.cryptowatchConfig.apiUrl}/markets/${this.exchange}/${this.pair}/ohlc`;
    this.ohlcvModel = Ohlcv(`ohlcv_${this.quoteAsset}_${this.baseAsset}`);
  }

  async get() {
    return axios
      .get(this.url, {
        params: {
          periods: 86400,
        },
      })
      .then((response) => {
        const data = response.data.result[this.period].slice(-this.dataLimit);
        const formattedData = data.map((d: number[]) => {
          return {
            // Cryptowatch API returns time in seconds, but we want milliseconds
            closeTime: d[0] * 1000,
            // 1 day ago
            targetTime: (d[0] - 24 * 60 * 60) * 1000,
            open: d[1],
            high: d[2],
            low: d[3],
            close: d[4],
            volume: d[5],
          };
        });
        return formattedData;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async insert(data: OhlcvDocument) {
    try {
      await this.ohlcvModel.insertMany(data);
    } catch (error) {
      console.log(error);
      console.log("Error inserting data");
    }
  }
}

export default CryptowatchOhlcv;
