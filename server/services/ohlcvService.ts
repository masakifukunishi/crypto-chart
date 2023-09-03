import config from "config";

import Ohlcv from "../models/ohlcv";
import { CHART_CONSTANT } from "../constants/chart";

export default class OhlcvService {
  private period: string;
  private currencyPair: string;

  constructor(period: string, currencyPair: string) {
    this.period = period || CHART_CONSTANT.CHART_PERIOD.ONE_YEAR.value;
    this.currencyPair = currencyPair || this.getDefaultCurrencyPair();
  }

  getDefaultCurrencyPair() {
    const cryptowatchConfig: any = config.get("cryptowatch");
    return `${cryptowatchConfig.quoteAssets[0]}_${cryptowatchConfig.baseAsset}`;
  }

  async getChartData() {
    const collectionName = this.generateCollectionName();
    const OhlcvModel = Ohlcv(collectionName);
    const { startDate, endDate } = this.calculateDateRange();

    const ohlcvRecords = await OhlcvModel.find({
      time: { $gte: startDate / 1000, $lte: endDate / 1000 },
    });
    const formattedOhlc = ohlcvRecords.map((record) => {
      return {
        x: record.time * 1000,
        y: [record.open, record.high, record.low, record.close],
      };
    });

    const formattedVolume = ohlcvRecords.map((record) => {
      return {
        x: record.time * 1000,
        y: record.volume,
      };
    });

    const formattedChartData = {
      ohlc: formattedOhlc,
      volume: formattedVolume,
    };

    return formattedChartData;
  }

  generateCollectionName() {
    return `ohlcv_${this.currencyPair}`;
  }

  calculateDateRange() {
    const currentDate = new Date();
    let startDate = null;
    let endDate = null;

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
