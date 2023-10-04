import config from "config";

import db from "../helpers/mongodb.js";
import { CryptowatchConfig } from "../types/config.js";
import CryptowatchOhlcv from "./lib/cryptowatch/ohlcv.js";

const processData = async () => {
  console.log("init batch started");
  db.connect();

  const cryptowatchConfig: CryptowatchConfig = config.get("cryptowatch");
  const quoteAssets = cryptowatchConfig.quoteAssets;
  const baseAsset = cryptowatchConfig.baseAsset;
  const exchange = cryptowatchConfig.exchange;
  const initDataNum = cryptowatchConfig.initDataNum;

  try {
    await Promise.all(
      quoteAssets.map(async (quoteAsset: { symbol: string; altname: string }) => {
        const ohlcv = new CryptowatchOhlcv(exchange, quoteAsset.symbol, baseAsset.symbol, initDataNum);
        const data = await ohlcv.get();
        await ohlcv.insert(data);
      })
    );
  } finally {
    db.close();
    console.log("init batch completed");
  }
};

processData();
