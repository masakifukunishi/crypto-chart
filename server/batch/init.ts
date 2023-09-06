import config from "config";

import db from "../helpers/mongodb.js";
import { CryptowatchConfig } from "../types/config.js";
import CryptowatchOhlcv from "./lib/cryptowatch/ohlcv.js";

async function processData() {
  db.connect();

  const cryptowatchConfig: CryptowatchConfig = config.get("cryptowatch");
  const quoteAssets = cryptowatchConfig.quoteAssets;
  const baseAsset = cryptowatchConfig.baseAsset;
  const exchange = cryptowatchConfig.exchange;
  const initDataNum = cryptowatchConfig.initDataNum;

  try {
    await Promise.all(
      quoteAssets.map(async (quoteAsset: string) => {
        const ohlcv = new CryptowatchOhlcv(exchange, quoteAsset, baseAsset, initDataNum);
        const data = await ohlcv.get();
        await ohlcv.insert(data);
      })
    );
  } finally {
    db.close();
  }
}

processData();
