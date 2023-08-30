import { Schema, model } from "mongoose";

const candleSchema = new Schema({
  open: {
    type: Number,
    required: true,
  },
  high: {
    type: Number,
    required: true,
  },
  low: {
    type: Number,
    required: true,
  },
  close: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});
export const Candle = model("Candle", candleSchema);
