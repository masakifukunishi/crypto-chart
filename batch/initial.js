import config from "config";

import Ohlcv from "./lib/cryptowatch/ohlcv.js";

const cryptoWatchConfig = config.get("cryptowatch");
const quoteAssets = cryptoWatchConfig.quoteAssets;
const baseAsset = cryptoWatchConfig.baseAsset;
const exchange = cryptoWatchConfig.exchange;
const initialDataLimit = cryptoWatchConfig.initialDataLimit;

quoteAssets.map(async (quoteAsset) => {
  const ohlcv = new Ohlcv(exchange, quoteAsset, baseAsset, initialDataLimit);
  const data = await ohlcv.get();
  ohlcv.insert(data);
});
