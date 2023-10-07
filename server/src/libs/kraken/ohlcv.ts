import axios from "axios";
import config from "config";
import WebSocket from "ws";
import { Model } from "mongoose";

import { KrakenConfig } from "../../types/config.js";
import Ohlcv, { OhlcvDocument } from "../../models/ohlcv.js";

interface Asset {
  symbol: string;
  altname: string;
}

class KrakenOhlcv {
  private krakenConfig: KrakenConfig;
  private period: number;
  private quoteAsset: Asset;
  private baseAsset: Asset;
  private url: string;
  private wsUrl: string;
  private ohlcvModel: Model<OhlcvDocument>;

  constructor(quoteAsset: Asset, baseAsset: Asset) {
    this.krakenConfig = config.get("kraken");
    this.period = this.krakenConfig.period.daily;
    this.quoteAsset = quoteAsset;
    this.baseAsset = baseAsset;
    this.url = `${this.krakenConfig.apiUrl}/0/public/OHLC?pair=${this.quoteAsset.symbol}${this.baseAsset.symbol}`;
    this.wsUrl = this.krakenConfig.wsUrl;
    this.ohlcvModel = Ohlcv(`ohlcv_${this.quoteAsset.symbol}_${this.baseAsset.symbol}`);
  }

  async get(num: number): Promise<OhlcvDocument[]> {
    return axios
      .get(this.url, {
        params: {
          interval: this.period,
        },
      })
      .then((response) => {
        const pair = `${this.quoteAsset.symbol}${this.baseAsset.symbol}`;
        const data = response.data.result[pair].slice(-num);
        const formattedData = data.map((d: number[]) => {
          return {
            // Kraken API returns time in seconds, but we want milliseconds
            targetTime: d[0] * 1000,
            open: d[1],
            high: d[2],
            low: d[3],
            close: d[4],
            volume: d[6],
          };
        });
        return formattedData;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async insert(data: OhlcvDocument | OhlcvDocument[]): Promise<void> {
    try {
      await this.ohlcvModel.insertMany(data);
    } catch (error) {
      console.log(error);
      console.log("Error inserting data");
    }
  }

  async updatePreviousData(data: OhlcvDocument): Promise<void> {
    const previousData = await this.ohlcvModel.findOne({ targetTime: data.targetTime });
    if (previousData) {
      await this.ohlcvModel.findOneAndUpdate({ targetTime: previousData.targetTime }, { $set: data }, { new: true });
    }
  }

  async findDataByCloseTime(targetTime: number): Promise<OhlcvDocument | null> {
    return this.ohlcvModel.findOne({ targetTime });
  }

  async updateDataByCloseTime(targetTime: number, newData: OhlcvDocument): Promise<OhlcvDocument | null> {
    return this.ohlcvModel.findOneAndUpdate({ targetTime }, { $set: newData }, { new: true });
  }

  setupWebSocket(): void {
    const ws = new WebSocket(this.wsUrl);
    ws.on("open", () => {
      const pair = `${this.quoteAsset.altname}/${this.baseAsset.altname}`;
      const subscribeMessage = JSON.stringify({
        event: "subscribe",
        pair: [pair],
        subscription: {
          name: "ohlc",
          interval: this.period,
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
  }
}

export default KrakenOhlcv;
