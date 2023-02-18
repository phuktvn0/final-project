import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config(); // lấy đúng dữ liệu từ file env

let mongoDb: MongoMemoryServer;
const MONGODB_URI: string =
  process.env.MONGO_URI ||
  'mongodb+srv://phuktvn0:Qq123213@phuktvn0.xwgmvjg.mongodb.net/final-project';

export const connect = async () => {
  let uri = MONGODB_URI;
  // console.log(`_${process.env.NODE_ENV}_`);
  // console.log(process.env.NODE_ENV == "test");
  if (process.env.NODE_ENV === 'test') {
    mongoDb = await MongoMemoryServer.create();
    uri = mongoDb.getUri();
    // console.log(uri);
  }

  await mongoose
    .connect(uri)
    .then(() => console.log(`DB connected ${uri}`))
    .catch((err) => console.log(err));
};

export const disconnect = async () => {
  await mongoose.disconnect();
  if (mongoDb) {
    await mongoDb.stop();
  }
};

export function getCurrentDate() {
  return new Date();
}
