import config from "config";

import { CryptowatchConfig } from "../types/config.js";
import CryptowatchOhlcv from "./lib/cryptowatch/ohlcv.js";

async function processData() {
  const cryptowatchConfig: CryptowatchConfig = config.get("cryptowatch");
  const quoteAssets = cryptowatchConfig.quoteAssets;
  const baseAsset = cryptowatchConfig.baseAsset;
  const exchange = cryptowatchConfig.exchange;
  const initDataNum = cryptowatchConfig.initDataNum;

  await Promise.all(
    quoteAssets.map(async (quoteAsset: string) => {
      const ohlcv = new CryptowatchOhlcv(exchange, quoteAsset, baseAsset, initDataNum);
      const data = await ohlcv.get();
      ohlcv.insert(data);
    })
  );
}

processData();
