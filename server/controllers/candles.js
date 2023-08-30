import { Candle } from "../models/candle.js";

export const getAllBooks = async function (req, res) {
  const candles = await Candle.find();
  res.json(candles);
};
