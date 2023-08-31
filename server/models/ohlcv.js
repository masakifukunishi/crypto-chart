import { Schema, model } from "mongoose";

const OhlcvSchema = new Schema({
  time: {
    type: Number,
    required: true,
  },
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
});

const Ohlcv = (collectionName) => model("Ohlcv", OhlcvSchema, collectionName);
export default Ohlcv;
