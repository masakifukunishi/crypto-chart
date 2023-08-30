import axios from "axios";
import config from "config";

import Mongo from "../mongo.js";

class Candle {
  constructor(exchange, currency, asset, dataLimit) {
    const cryptoWatchConfig = config.get("cryptowatch");
    this.period = cryptoWatchConfig.period.daily;
    this.mongodb = new Mongo();
    this.exchange = exchange;
    this.currency = currency;
    this.asset = asset;
    this.pair = `${this.currency}${this.asset}`;
    this.dataLimit = dataLimit;
  }

  async get() {
    const url = `https://api.cryptowat.ch/markets/${this.exchange}/${this.pair}/ohlc`;
    console.log(url);
    return axios
      .get(url, {
        params: {
          periods: 86400,
        },
      })
      .then((response) => {
        const data = response.data.result[this.period].slice(0, this.dataLimit);
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
    this.mongodb.insertMany(`candles_${this.currency}_${this.asset}`, data);
  }
}

export default Candle;
