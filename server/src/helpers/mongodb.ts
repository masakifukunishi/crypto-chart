import mongoose, { ConnectOptions, Mongoose } from "mongoose";
import env from "dotenv";

env.config();

const mongodbUri = process.env.MONGODB_URI as string;

class Database {
  private mongoose: Mongoose;

  constructor() {
    this.mongoose = mongoose;
  }

  public connect() {
    this.mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);

    const db = this.mongoose.connection;

    db.once("error", (err) => {
      console.error("Mongo DB connection error: ", err);
    });

    db.once("open", () => {
      console.log("Mongo DB connected successfully");
    });
  }

  public close() {
    this.mongoose.connection
      .close()
      .then(() => {
        console.log("MongoDB connection closed");
      })
      .catch((err) => {
        console.error("Error closing MongoDB connection: ", err);
      });
  }
}

const db = new Database();

export default db;
