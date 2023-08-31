import config from "config";

import Ohlcv from "./lib/cryptowatch/ohlcv.js";

const cryptoWatchConfig = config.get("cryptowatch");
const currencies = cryptoWatchConfig.currency;
const asset = cryptoWatchConfig.asset;
const exchange = cryptoWatchConfig.exchange;
const initialDataLimit = cryptoWatchConfig.initialDataLimit;

currencies.map(async (currency) => {
  const ohlcv = new Ohlcv(exchange, currency, asset, initialDataLimit);
  const data = await ohlcv.get();
  ohlcv.insert(data);
});
