import config from "config";

import db from "../helpers/mongodb.js";
import { KrakenConfig } from "../types/config.js";
import KrakenOhlcv from "./lib/kraken/ohlcv.js";

const processData = async () => {
  console.log("init batch started");
  db.connect();

  const krakenConfig: KrakenConfig = config.get("kraken");
  const quoteAssets = krakenConfig.quoteAssets;
  const baseAsset = krakenConfig.baseAsset;
  const initDataNum = krakenConfig.initDataNum;

  try {
    await Promise.all(
      quoteAssets.map(async (quoteAsset: { symbol: string; altname: string }) => {
        const ohlcv = new KrakenOhlcv(quoteAsset.symbol, baseAsset.symbol, initDataNum);
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
