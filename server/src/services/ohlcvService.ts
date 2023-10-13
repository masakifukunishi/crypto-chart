import config from "config";
import { Schema, Model } from "mongoose";
import { ChangeStreamInsertDocument, ChangeStreamUpdateDocument } from "mongodb";

import { KrakenConfig } from "../types/config.js";
import Ohlcv, { OhlcvDocument } from "../models/ohlcv.js";
import { CHART_CONSTANT } from "../constants/chart.js";

interface FormattedChartData {
  ohlc: { x: number; y: number[] }[];
  volume: { x: number; y: number }[];
}

interface formattedChartRecord {
  ohlc: { x: number; y: number[] };
  volume: { x: number; y: number };
}

interface DateRange {
  startDate: number;
  endDate: number;
}

export default class OhlcvService {
  private krakenConfig: KrakenConfig;
  private period: string;
  private currencyPair: string;
  private collectionName: string;
  private ohlcvModel: Model<OhlcvDocument>;

  constructor(period: string, currencyPair: string) {
    this.krakenConfig = config.get("kraken");
    this.period = period || CHART_CONSTANT.CHART_PERIOD.ONE_YEAR.value;
    this.currencyPair = currencyPair || this.getDefaultCurrencyPair();
    this.collectionName = this.generateCollectionName();
    this.ohlcvModel = Ohlcv(this.collectionName);
  }

  getDefaultCurrencyPair(): string {
    return `${this.krakenConfig.quoteAssets[0].symbol}_${this.krakenConfig.baseAsset.symbol}`;
  }

  async getChartData(): Promise<FormattedChartData> {
    const { startDate, endDate } = this.calculateDateRange();

    const ohlcvRecords = await this.ohlcvModel
      .find({
        targetTime: { $gte: startDate, $lte: endDate },
      })
      .sort({ targetTime: 1 });

    const formattedOhlc = ohlcvRecords.map((record) => {
      return {
        x: record.targetTime,
        y: [record.open, record.high, record.low, record.close],
      };
    });
    const formattedVolume = ohlcvRecords.map((record) => {
      return {
        x: record.targetTime,
        y: record.volume,
      };
    });

    const formattedChartData = {
      ohlc: formattedOhlc,
      volume: formattedVolume,
    };

    return formattedChartData;
  }

  async getChartDataById(id: string): Promise<formattedChartRecord> {
    const ohlcvRecord = await this.ohlcvModel.findById(id);

    if (!ohlcvRecord) {
      throw new Error("Invalid id");
    }
    const ohlc = {
      x: ohlcvRecord.targetTime,
      y: [ohlcvRecord.open, ohlcvRecord.high, ohlcvRecord.low, ohlcvRecord.close],
    };
    const volume = {
      x: ohlcvRecord.targetTime,
      y: ohlcvRecord.volume,
    };

    return { ohlc, volume };
  }

  generateCollectionName(): string {
    return `ohlcv_${this.currencyPair}`;
  }

  calculateDateRange(): DateRange {
    const currentDate = new Date();
    let startDate = 0;
    let endDate = 0;

    switch (this.period) {
      case CHART_CONSTANT.CHART_PERIOD.ONE_YEAR.value: {
        const oneYearAgo = new Date(currentDate);
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        startDate = oneYearAgo.getTime();
        endDate = currentDate.getTime();
        break;
      }
      case CHART_CONSTANT.CHART_PERIOD.YEAR_TO_DATE.value: {
        const currentYear = currentDate.getFullYear();
        startDate = new Date(currentYear, 0, 1).getTime();
        endDate = currentDate.getTime();
        break;
      }
      case CHART_CONSTANT.CHART_PERIOD.SIX_MONTHS.value: {
        const sixMonthsAgo = new Date(currentDate);
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        startDate = sixMonthsAgo.getTime();
        endDate = currentDate.getTime();
        break;
      }
      case CHART_CONSTANT.CHART_PERIOD.ONE_MONTH.value: {
        const oneMonthAgo = new Date(currentDate);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        startDate = oneMonthAgo.getTime();
        endDate = currentDate.getTime();
        break;
      }
      default:
        throw new Error("Invalid period");
    }

    return { startDate, endDate };
  }

  watchModel(originalOhlcv: FormattedChartData, callback: (ohlcv: FormattedChartData) => void): void {
    this.ohlcvModel.watch().on("change", async (change) => {
      const updatedData = await this.getChartDataById(change.documentKey._id.toString());
      if (change.operationType === "insert") {
        const updatedOhlcv = {
          ohlc: [...originalOhlcv.ohlc, updatedData.ohlc],
          volume: [...originalOhlcv.volume, updatedData.volume],
        };
        callback(updatedOhlcv);
      } else if (change.operationType === "update") {
        originalOhlcv.ohlc[originalOhlcv.ohlc.length - 1] = updatedData.ohlc;
        originalOhlcv.volume[originalOhlcv.volume.length - 1] = updatedData.volume;
        callback(originalOhlcv);
      }
    });
  }
}
