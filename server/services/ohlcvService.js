import Ohlcv from "../models/ohlcv.js";
import { CHART_CONSTANT } from "../constants/chart.js";

export default class OhlcvService {
  async getChartData(period, currencyPair) {
    const collectionName = "ohlcv_btc_usd";
    const OhlcvModel = Ohlcv(collectionName);
    const { startDate, endDate } = this.calculateDateRange(period);

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

  calculateDateRange(period) {
    const currentDate = new Date();
    let startDate = null;
    let endDate = null;

    switch (period) {
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
