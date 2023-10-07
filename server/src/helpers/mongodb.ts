import mongoose, { ConnectOptions, Mongoose } from "mongoose";
import env from "dotenv";

env.config();

const mongodbUri = process.env.MONGODB_URI as string;

class Database {
  private mongoose: Mongoose;

  constructor() {
    this.mongoose = mongoose;
  }

  public async connect() {
    try {
      console.log("Connecting to MongoDB...");
      await this.mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
      console.log("Mongo DB connected successfully");
    } catch (error) {
      console.error("Error connecting to MongoDB: ", error);
    }
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
