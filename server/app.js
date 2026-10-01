import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route imports
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import habitRoutes from './routes/habitRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import journalRoutes from './routes/journalRoutes.js';
import dsaRoutes from './routes/dsaRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    platform: 'Winter Arc Backend',
    timestamp: new Date().toISOString()
  });
});

// Mount API Routes strictly matching README.md
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/dsa', dsaRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/uploads', uploadRoutes);

// Production Static Serving for unified single-host deployment
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../client/dist');
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/health') return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Error Handling Middleware
app.use(errorHandler);

export default app;
