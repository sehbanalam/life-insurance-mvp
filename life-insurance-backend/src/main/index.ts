import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import recommendationRouter from '../interfaces/routes/recommendation.route';
import { config } from '../infrastructure/env';
import { pool } from '../infrastructure/db';

const app = express();

// --- Security Middleware ---

// Set secure HTTP headers
app.use(helmet());

// Limit CORS to trusted domain (adjust as needed)
app.use(cors({
  origin: ['https://life-insurance-mvp.vercel.app'], // Add localhost for dev if needed
  methods: ['GET', 'POST'],
}));

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Limit JSON payload size
app.use(express.json({ limit: '1kb' }));

// --- Health Checks ---

app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

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

// --- Routes ---
app.use('/recommendation', recommendationRouter);

// --- Start Server ---
app.listen(config.PORT, () => {
  console.log(`✅ Server running at http://localhost:${config.PORT}`);
});
