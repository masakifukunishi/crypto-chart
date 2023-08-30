import { Candle } from "../models/candle.js";

export const getAllCandles = async function (req, res) {
  const candles = await Candle.find();
  res.json(candles);
};
