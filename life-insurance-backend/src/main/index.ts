import express from 'express';
import cors from 'cors';
import recommendationRouter from '../interfaces/routes/recommendation.route';
import { config } from '../infrastructure/env';
import { pool } from '../infrastructure/db';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// DB Health Check
app.get('/db-health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ db: 'connected' });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Database connection failed:', message);
    res.status(500).json({ db: 'disconnected', error: message });
  }
});

// Routes
app.use('/recommendation', recommendationRouter);

// Start Server
app.listen(config.PORT, () => {
  console.log(`✅ Server running at http://localhost:${config.PORT}`);
});
