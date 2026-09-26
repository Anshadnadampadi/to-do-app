import mongoose from 'mongoose';

export let isConnectedToMongo = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/winter-arc';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    isConnectedToMongo = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnectedToMongo = false;
    console.warn(`[MongoDB] Could not connect to MongoDB Atlas (${error.message}).`);
    console.info(`[MongoDB] Operating in high-speed resilient in-memory storage fallback mode.`);
  }
};
