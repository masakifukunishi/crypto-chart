import config from "config";
import cron from "node-cron";

import db from "../helpers/mongodb.js";
import { CryptowatchConfig } from "../types/config.js";
import CryptowatchOhlcv from "./lib/cryptowatch/ohlcv.js";

async function processData() {
  db.connect();

  try {
    const cryptowatchConfig: CryptowatchConfig = config.get("cryptowatch");
    const quoteAssets = cryptowatchConfig.quoteAssets;
    const baseAsset = cryptowatchConfig.baseAsset;
    const exchange = cryptowatchConfig.exchange;
    const dailyDataNum = cryptowatchConfig.dailyDataNum;

    await Promise.all(
      quoteAssets.map(async (quoteAsset: string) => {
        const ohlcv = new CryptowatchOhlcv(exchange, quoteAsset, baseAsset, dailyDataNum);
        const data = await ohlcv.get();
        const existingData = await ohlcv.findDataByCloseTime(data[0].closeTime);
        if (existingData) {
          await ohlcv.updateDataByCloseTime(data[0].closeTime, data[0]);
        } else {
          ohlcv.insert(data);
          await ohlcv.updatePreviousData(data[0]);
        }
      })
    );
  } finally {
    db.close();
  }
}

cron.schedule("0 0 * * *", () => {
  processData();
});
