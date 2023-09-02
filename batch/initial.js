import config from "config";

import Ohlcv from "./lib/cryptowatch/ohlcv.js";

const cryptowatchConfig = config.get("cryptowatch");
const quoteAssets = cryptowatchConfig.quoteAssets;
const baseAsset = cryptowatchConfig.baseAsset;
const exchange = cryptowatchConfig.exchange;
const initialDataLimit = cryptowatchConfig.initialDataLimit;

quoteAssets.map(async (quoteAsset) => {
  const ohlcv = new Ohlcv(exchange, quoteAsset, baseAsset, initialDataLimit);
  const data = await ohlcv.get();
  ohlcv.insert(data);
});
