import Candle from "../models/candle.js";

export const getAllCandles = async function (req, res) {
  const collectionName = "candles_btc_usd";
  const CandleModel = Candle(collectionName);
  const candles = await CandleModel.find().catch((err) => {
    console.log(err);
  });
  console.log(candles);
  res.json(candles);
};
