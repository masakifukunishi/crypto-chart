import axios from "axios";
import config from "config";
import { Model } from "mongoose";

import { CryptowatchConfig } from "../../../../config/config.js";
import "../../../helpers/db.js";
import Ohlcv, { OhlcvDocument } from "../../../models/ohlcv.js";

class CryptowatchOhlcv {
  private period: number;
  private exchange: string;
  private quoteAsset: string;
  private baseAsset: string;
  private pair: string;
  private dataLimit: number;
  private url: string;
  private ohlcvModel: Model<OhlcvDocument>;

  constructor(exchange: string, quoteAsset: string, baseAsset: string, dataLimit: number) {
    const cryptowatchConfig: CryptowatchConfig = config.get("cryptowatch");

    this.period = cryptowatchConfig.period.daily;
    this.exchange = exchange;
    this.quoteAsset = quoteAsset;
    this.baseAsset = baseAsset;
    this.pair = `${this.quoteAsset}${this.baseAsset}`;
    this.dataLimit = dataLimit;
    this.url = `${cryptowatchConfig.apiUrl}/markets/${this.exchange}/${this.pair}/ohlc`;
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
            time: d[0],
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
    }
  }
}

export default CryptowatchOhlcv;
