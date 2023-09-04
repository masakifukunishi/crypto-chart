import { Schema, model, Document } from "mongoose";

export interface OhlcvDocument extends Document {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const OhlcvSchema = new Schema<OhlcvDocument>({
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

// Ohlcv モデルを定義してエクスポート
const Ohlcv = (collectionName: string) => model<OhlcvDocument>("Ohlcv", OhlcvSchema, collectionName);

export default Ohlcv;
