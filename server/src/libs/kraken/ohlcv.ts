import axios from "axios";
import config from "config";
import WebSocket from "ws";
import { Model } from "mongoose";

import { KrakenConfig } from "../../types/config.js";
import Ohlcv, { OhlcvDocument, OhlcvData } from "../../models/ohlcv.js";

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

  async get(num: number): Promise<OhlcvData[]> {
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

  async insert(data: OhlcvData | OhlcvData[]): Promise<void> {
    try {
      await this.ohlcvModel.insertMany(data);
    } catch (error) {
      console.log(error);
      console.log("Error inserting data");
    }
  }

  async upsert(data: OhlcvData): Promise<void> {
    try {
      await this.ohlcvModel.updateOne(
        {
          targetTime: data.targetTime,
        },
        data,
        { upsert: true }
      );
    } catch (error) {
      console.log(error);
      console.log("Error upserting data");
    }
  }

  async updatePreviousData(data: OhlcvData): Promise<void> {
    const previousData = await this.ohlcvModel.findOne({ targetTime: data.targetTime });
    if (previousData) {
      await this.ohlcvModel.findOneAndUpdate({ targetTime: previousData.targetTime }, { $set: data }, { new: true });
    }
  }

  async findDataByTime(targetTime: number): Promise<OhlcvData | null> {
    return this.ohlcvModel.findOne({ targetTime });
  }

  async updateDataByTime(targetTime: number, newData: OhlcvData): Promise<OhlcvData | null> {
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
      if (Array.isArray(data)) {
        const formattedData: OhlcvData = {
          // 1 day ago
          targetTime: (parseInt(data[1][1]) - 24 * 60 * 60) * 1000,
          open: parseFloat(data[1][2]),
          high: parseFloat(data[1][3]),
          low: parseFloat(data[1][4]),
          close: parseFloat(data[1][5]),
          volume: parseFloat(data[1][6]),
        };
        this.upsert(formattedData);
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
