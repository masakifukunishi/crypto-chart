import config from "config";

import Ohlc from "./lib/cryptowatch/ohlc.js";

const cryptoWatchConfig = config.get("cryptowatch");
const currencies = cryptoWatchConfig.currency;
const asset = cryptoWatchConfig.asset;
const exchange = cryptoWatchConfig.exchange;
const initialDataLimit = cryptoWatchConfig.initialDataLimit;

currencies.map(async (currency) => {
  const pair = `${currency}${asset}`;
  const ohlc = new Ohlc();
  const data = await ohlc.get(exchange, pair, initialDataLimit);
  ohlc.insert(data);
});
