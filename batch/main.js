import dotenv from "dotenv";
import axios from "axios";
import MongoDB from "./lib/MongoDB.js";

dotenv.config();
const exchange = "binance";
const pair = "btcusd";

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
const url = `https://api.cryptowat.ch/markets/${exchange}/${pair}/ohlc`;

// axios
//   .get(url, {
//     params: {
//       periods: 86400,
//     },
//   })
//   .then((response) => {
//     const data = response.data.result["86400"];
//     const formattedData = data.map((d) => {
//       return {
//         time: d[0],
//         open: d[1],
//         high: d[2],
//         low: d[3],
//         close: d[4],
//         volume: d[5],
//       };
//     });
//     const mongodb = new MongoDB();
//     mongodb.insertMany("btc_usd", formattedData);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const testData = [
  {
    time: 1612137600,
    open: 0.0,
    high: 0.0,
    low: 0.0,
    close: 0.0,
    volume: 0.0,
  },
  {
    time: 1612224000,
    open: 0.0,
    high: 0.0,
    low: 0.0,
    close: 0.0,
    volume: 0.0,
  },
];

const mongodb = new MongoDB();
mongodb.insertMany("btc_usd", testData);
