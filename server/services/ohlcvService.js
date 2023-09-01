// services/ohlcvService.js
import Ohlcv from "../models/ohlcv.js";

export default class OhlcvService {
  async getChartData(period) {
    const collectionName = "ohlcv_btc_usd";
    const OhlcvModel = Ohlcv(collectionName);
    const { startDate, endDate } = this.calculateDateRange(period);

    // const ohlcvRecords = await OhlcvModel.find({
    //   createdAt: { $gte: startDate, $lte: endDate },
    // });
    const ohlcvRecords = await OhlcvModel.find();
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
    if (period === "1Y") {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      startDate = oneYearAgo;
      endDate = new Date();
    } else if (period === "YTD") {
      const currentYear = new Date().getFullYear();
      startDate = new Date(currentYear, 0, 1);
      endDate = new Date();
    } else if (period === "6month") {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      startDate = sixMonthsAgo;
      endDate = new Date();
    } else if (period === "1month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      startDate = oneMonthAgo;
      endDate = new Date();
    } else {
      startDate = null;
      endDate = null;
    }
    return { startDate, endDate };
  }
}
