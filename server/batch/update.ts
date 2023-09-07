import config from "config";
import cron from "node-cron";

import db from "../helpers/mongodb.js";
import { CryptowatchConfig } from "../types/config.js";
import CryptowatchOhlcv from "./lib/cryptowatch/ohlcv.js";

async function processData() {
  try {
    console.log("update batch started");
    const cryptowatchConfig: CryptowatchConfig = config.get("cryptowatch");
    const quoteAssets = cryptowatchConfig.quoteAssets;
    const baseAsset = cryptowatchConfig.baseAsset;
    const exchange = cryptowatchConfig.exchange;
    const dailyDataNum = cryptowatchConfig.dailyDataNum;

    await Promise.all(
      quoteAssets.map(async (quoteAsset: string) => {
        // dailyDataNum + 1 because I need to get the previous day's data as well
        const ohlcv = new CryptowatchOhlcv(exchange, quoteAsset, baseAsset, dailyDataNum + 1);
        const data = await ohlcv.get();
        // Reverse the data so that the most recent data is first
        const reversedData = data.reverse();
        const existingData = await ohlcv.findDataByCloseTime(reversedData[0].closeTime);
        if (existingData) {
          await ohlcv.updateDataByCloseTime(reversedData[0].closeTime, reversedData[0]);
        } else {
          ohlcv.insert(reversedData[0]);
          await ohlcv.updatePreviousData(reversedData[1]);
        }
      })
    );
  } finally {
    console.log("update batch completed");
  }
}

console.log("update batch running");

db.connect();
cron.schedule("* * * * *", () => {
  processData();
});
