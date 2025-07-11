import express from 'express';
import cors from 'cors';
import recommendationRouter from '../interfaces/routes/recommendation.route';
import { config } from '../infrastructure/env';

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.use('/recommendation', recommendationRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
