import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5001;

// Connect Database (MongoDB with resilient fallback)
connectDB();

const server = app.listen(PORT, () => {
  console.log(`❄️ Winter Arc API server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🚀 Client origin: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = Number(PORT) + 1;
    console.log(`Port ${PORT} in use, attempting port ${nextPort}...`);
    app.listen(nextPort, () => {
      console.log(`❄️ Winter Arc API server running on http://localhost:${nextPort}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
