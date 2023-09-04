import config from "config";
import cron from "node-cron";

import { CryptowatchConfig } from "../../config/config.js";
import CryptowatchOhlcv from "./lib/cryptowatch/ohlcv.js";

async function processData() {
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
}

cron.schedule("0 0 * * *", () => {
  processData;
});
