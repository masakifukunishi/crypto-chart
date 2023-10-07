import config from "config";

import db from "../helpers/mongodb.js";
import { KrakenConfig } from "../types/config.js";
import KrakenOhlcv from "../libs/kraken/ohlcv.js";

const processData = async () => {
  console.log("init batch started");
  await db.connect();

  const krakenConfig: KrakenConfig = config.get("kraken");
  const quoteAssets = krakenConfig.quoteAssets;
  const baseAsset = krakenConfig.baseAsset;
  const dataNum = krakenConfig.dataNum;

  try {
    await Promise.all(
      quoteAssets.map(async (quoteAsset: { symbol: string; altname: string }) => {
        const ohlcv = new KrakenOhlcv(quoteAsset, baseAsset);
        const data = await ohlcv.get(dataNum);
        await ohlcv.insert(data);
      })
    );
  } finally {
    db.close();
    console.log("init batch completed");
  }
};

processData();
