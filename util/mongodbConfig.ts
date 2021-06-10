import { MongoClient } from "mongodb";
import { myGlobal } from "../lib/types";
declare const global: myGlobal;

const { MONGODB_URL, MONGODB_DB } = process.env;

if (!MONGODB_URL) {
  throw new Error(
    "please define a MONGODB_URI connections string inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error("please define a MONGODB_DB db name inside .env.local");
}

/**
 * Global is used here to maintain cache connections across hot reloads in developement.
 * This prevents connections growing exponentially during Api Route usage.
 */

let cached: any = global.mongo;
if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = MongoClient.connect(MONGODB_URL, options).then(
      (client) => {
        return {
          client,
          db: client.db(MONGODB_DB),
        };
      }
    );
  }
  cached.conn = await cached.promise;
  return cached;
};
