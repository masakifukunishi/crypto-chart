import Candle from "../models/candle.js";

export const getAllCandles = async function (req, res) {
  const collectionName = "candles_btc_usd";
  const CandleModel = Candle(collectionName);
  const candles = await CandleModel.find();
  // convert to chart data format
  const formattedCandles = candles.map((candle) => {
    return {
      x: candle.time * 1000,
      y: [candle.open, candle.high, candle.low, candle.close],
    };
  });
  res.json(formattedCandles);
};
