import mongoose from "mongoose";

const DB_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/doctor-booking-test";

beforeAll(async () => {
  await mongoose.connect(DB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});