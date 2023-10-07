import config from "config";
import db from "../helpers/mongodb.js";

import { KrakenConfig } from "../types/config.js";
import KrakenOhlcv from "../libs/kraken/ohlcv.js";

const krakenConfig: KrakenConfig = config.get("kraken");
const quoteAssets = krakenConfig.quoteAssets;
const baseAsset = krakenConfig.baseAsset;

await db.connect();
quoteAssets.forEach((quoteAsset) => {
  const ohlcv = new KrakenOhlcv(quoteAsset, baseAsset);
  ohlcv.setupWebSocket();
});
