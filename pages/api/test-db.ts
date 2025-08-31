import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import mongoose from 'mongoose';

// Ensure this route runs on the Node.js runtime (not Edge)
export const config = { runtime: 'nodejs' };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Test MongoDB connection
    await dbConnect();
    
    // Get connection status
    const connectionState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    const dbName = mongoose.connection.db?.databaseName;
    
    return res.status(200).json({
      success: true,
      message: 'MongoDB connection successful',
      connectionState: states[connectionState as keyof typeof states],
      database: dbName,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'MongoDB connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}
