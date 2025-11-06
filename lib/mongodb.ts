import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Enhanced MongoDB connection with better error handling and retry logic
 */
async function dbConnect() {
  // Check if already connected
  if (cached.conn) {
    // Verify connection is still alive
    if (mongoose.connection.readyState === 1) {
      return cached.conn;
    } else {
      // Connection exists but is not ready, reset it
      console.warn('MongoDB connection exists but is not ready, resetting...');
      cached.conn = null;
      cached.promise = null;
    }
  }

  // If already connecting, wait for that promise
  if (cached.promise) {
    try {
      cached.conn = await cached.promise;
      return cached.conn;
    } catch (e) {
      // Connection failed, reset promise to allow retry
      cached.promise = null;
      throw e;
    }
  }

  // Create new connection promise
  const opts = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    socketTimeoutMS: 45000, // 45 seconds socket timeout
    maxPoolSize: 10,
    minPoolSize: 1,
  };

  cached.promise = mongoose
    .connect(MONGODB_URI, opts)
    .then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    })
    .catch((error) => {
      // Log detailed error information
      console.error('MongoDB connection error:', {
        message: error.message,
        name: error.name,
        code: (error as any).code,
        codeName: (error as any).codeName,
      });
      
      // Reset promise on error to allow retry
      cached.promise = null;
      throw error;
    });

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    // Reset on error
    cached.promise = null;
    throw e;
  }
}

export default dbConnect;
