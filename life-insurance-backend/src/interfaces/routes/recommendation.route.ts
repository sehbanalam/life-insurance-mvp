import express from 'express';
import { getRecommendation } from '../../app/recommend';
import { pool } from '../../infrastructure/db';
import { SubmissionInput } from '../../domain/submission';

const router = express.Router();

router.post('/', async (req, res) => {
  const { age, income, dependents, risk_tolerance } = req.body as SubmissionInput;

  console.log('Received input:', req.body);

  if (
    typeof age !== 'number' ||
    typeof income !== 'number' ||
    typeof dependents !== 'number' ||
    !['Low', 'Medium', 'High'].includes(risk_tolerance)
  ) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const result = getRecommendation({ age, income, dependents, risk_tolerance });

  try {
    await pool.query(
      `INSERT INTO submissions (age, income, dependents, risk_tolerance, recommendation, explanation)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [age, income, dependents, risk_tolerance, result.recommendation, result.explanation]
    );
    res.json(result);
  } catch (err) {
    console.error('DB insert error:', err);
    res.status(500).json({ error: 'DB insert error:' });
  }
});

export default router;
