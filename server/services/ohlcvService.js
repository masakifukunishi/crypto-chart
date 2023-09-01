// services/ohlcvService.js
import Ohlcv from "../models/ohlcv.js";

export default class OhlcvService {
  async getChartData(period) {
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
    let startDate, endDate;

    if (period === "1YEAR") {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      startDate = oneYearAgo.getTime();
      endDate = new Date().getTime();
    } else if (period === "YTD") {
      const currentYear = new Date().getFullYear();
      startDate = new Date(currentYear, 0, 1).getTime();
      endDate = new Date().getTime();
    } else if (period === "6MONTH") {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      startDate = sixMonthsAgo.getTime();
      endDate = new Date().getTime();
    } else if (period === "1MONTH") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      startDate = oneMonthAgo.getTime();
      endDate = new Date().getTime();
    } else {
      startDate = null;
      endDate = null;
    }
    return { startDate, endDate };
  }
}
