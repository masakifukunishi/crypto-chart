import WebSocket from "ws";
import config from "config";

import db from "../helpers/mongodb.js";
import { KrakenConfig } from "../types/config.js";
import KrakenOhlcv from "../libs/kraken/ohlcv.js";

const setupWebSocket = (baseAsset: string, quoteAsset: string) => {
  const krakenConfig: KrakenConfig = config.get("kraken");
  const wsUrl = krakenConfig.wsUrl;
  const period = krakenConfig.period;

  const ws = new WebSocket(wsUrl);
  ws.on("open", () => {
    const pair = `${quoteAsset}/${baseAsset}`;
    const subscribeMessage = JSON.stringify({
      event: "subscribe",
      pair: [pair],
      subscription: {
        name: "ohlc",
        interval: period.daily,
      },
    });

    console.log(`Sending subscription for ${pair}`);
    ws.send(subscribeMessage);
  });

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());
    if (data.event !== "heartbeat") {
      console.log(data);
    }
  });

  ws.on("error", (error) => {
    console.error(error);
  });

  ws.on("close", (code, reason) => {
    console.log(`Closed with code ${code}: ${reason}`);
  });
};

const krakenConfig: KrakenConfig = config.get("kraken");
const quoteAssets = krakenConfig.quoteAssets;
const baseAsset = krakenConfig.baseAsset;

quoteAssets.forEach((quoteAsset) => {
  setupWebSocket(baseAsset.altname, quoteAsset.altname);
});
