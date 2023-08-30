import config from "config";

import Candle from "./lib/cryptowatch/candle.js";

const cryptoWatchConfig = config.get("cryptowatch");
const currencies = cryptoWatchConfig.currency;
const asset = cryptoWatchConfig.asset;
const exchange = cryptoWatchConfig.exchange;
const initialDataLimit = cryptoWatchConfig.initialDataLimit;

currencies.map(async (currency) => {
  const candle = new Candle(exchange, currency, asset, initialDataLimit);
  const data = await candle.get();
  candle.insert(data);
});
