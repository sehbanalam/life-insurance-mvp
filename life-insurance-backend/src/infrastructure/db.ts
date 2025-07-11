import { Pool } from 'pg';
import { config } from './env';

export const pool = new Pool({
  connectionString: config.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
