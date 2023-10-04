import config from "config";

import { KrakenConfig } from "../types/config.js";
import Ohlcv from "../models/ohlcv.js";
import { CHART_CONSTANT } from "../constants/chart.js";

interface FormattedChartData {
  ohlc: { x: number; y: number[] }[];
  volume: { x: number; y: number }[];
}
interface DateRange {
  startDate: number;
  endDate: number;
}

export default class OhlcvService {
  private krakenConfig: KrakenConfig;
  private period: string;
  private currencyPair: string;

  constructor(period: string, currencyPair: string) {
    this.krakenConfig = config.get("kraken");
    this.period = period || CHART_CONSTANT.CHART_PERIOD.ONE_YEAR.value;
    this.currencyPair = currencyPair || this.getDefaultCurrencyPair();
  }

  getDefaultCurrencyPair(): string {
    return `${this.krakenConfig.quoteAssets[0].symbol}_${this.krakenConfig.baseAsset.symbol}`;
  }

  async getChartData(): Promise<FormattedChartData> {
    const collectionName = this.generateCollectionName();
    const OhlcvModel = Ohlcv(collectionName);
    const { startDate, endDate } = this.calculateDateRange();

    const ohlcvRecords = await OhlcvModel.find({
      targetTime: { $gte: startDate, $lte: endDate },
    }).sort({ targetTime: 1 });
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
}
