import { Schema, model } from "mongoose";

const candleSchema = new Schema({
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

const Candle = (collectionName) => model("Candle", candleSchema, collectionName);
export default Candle;
