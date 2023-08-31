import Ohlcv from "../models/ohlcv.js";

export const getOhlcv = async function (req, res) {
  const collectionName = "ohlcv_btc_usd";
  const OhlcvModel = Ohlcv(collectionName);
  const ohlcvRecords = await OhlcvModel.find();
  // convert to chart data format
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

  res.json(formattedChartData);
};
