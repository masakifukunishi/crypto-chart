import axios from "axios";
import config from "config";

import Mongo from "../mongo.js";

class Ohlc {
  constructor() {
    const cryptoWatchConfig = config.get("cryptowatch");
    this.period = cryptoWatchConfig.period.daily;
  }

  async get(exchange, pair, dataLimit) {
    const url = `https://api.cryptowat.ch/markets/${exchange}/${pair}/ohlc`;
    console.log(url);

    return axios
      .get(url, {
        params: {
          periods: 86400,
        },
      })
      .then((response) => {
        const data = response.data.result[this.period].slice(0, dataLimit);
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
    const mongodb = new Mongo();
    mongodb.insertMany("btc_usd", data);
  }
}

export default Ohlc;
