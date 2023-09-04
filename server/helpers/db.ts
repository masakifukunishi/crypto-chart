import mongoose, { ConnectOptions } from "mongoose";
import env from "dotenv";

env.config();

const mongodbUri = process.env.MONGODB_URI as string;
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);

const db = mongoose.connection;

db.once("error", function (err) {
  console.error("connection error: ", err);
});

db.once("open", function () {
  console.log("Connected successfully");
});
