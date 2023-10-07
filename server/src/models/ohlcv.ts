import { Schema, model, Document, Model } from "mongoose";

export interface OhlcvDocument extends Document {
  targetTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OhlcvData {
  targetTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const OhlcvSchema = new Schema<OhlcvDocument>({
  targetTime: {
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

const Ohlcv: (collectionName: string) => Model<OhlcvDocument> = (collectionName: string) =>
  model<OhlcvDocument>("Ohlcv", OhlcvSchema, collectionName);

export default Ohlcv;
