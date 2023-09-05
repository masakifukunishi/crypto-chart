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
        ohlcv.insert(data);
      })
    );
  } finally {
    db.close();
  }
}

cron.schedule("0 0 * * *", () => {
  processData;
});
