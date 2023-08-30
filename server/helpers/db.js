import mongoose from "mongoose";
import env from "dotenv";
env.config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("error", function (err) {
  console.error("connection error: ", err);
});

db.once("open", function () {
  console.log("Connected successfully");
});
