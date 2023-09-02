import axios from "axios";
import config from "config";

import Mongo from "../mongo.js";

class Ohlcv {
  constructor(exchange, quoteAsset, baseAsset, dataLimit) {
    const cryptoWatchConfig = config.get("cryptowatch");
    this.period = cryptoWatchConfig.period.daily;
    this.mongodb = new Mongo();
    this.exchange = exchange;
    this.quoteAsset = quoteAsset;
    this.baseAsset = baseAsset;
    this.pair = `${this.quoteAsset}${this.baseAsset}`;
    this.dataLimit = dataLimit;
    this.url = `${cryptoWatchConfig.apiUrl}/markets/${this.exchange}/${this.pair}/ohlc`;
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
        const formattedData = data.map((d) => {
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
  insert(data) {
    this.mongodb.insertMany(`ohlcv_${this.quoteAsset}_${this.baseAsset}`, data);
  }
}

export default Ohlcv;
