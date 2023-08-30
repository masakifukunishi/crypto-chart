import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

class Mongo {
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI);
  }

  async connect(collectionName, operation) {
    try {
      await this.client.connect();
      const db = this.client.db();
      const collection = db.collection(collectionName);
      return await operation(collection);
    } catch (e) {
      console.error(e);
    } finally {
      await this.client.close();
    }
  }

  async insertMany(collectionName, array) {
    return this.connect(collectionName, async (collection) => {
      return await collection.insertMany(array);
    });
  }
}

export default Mongo;
