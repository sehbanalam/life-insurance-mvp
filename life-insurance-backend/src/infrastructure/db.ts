// Import the PostgreSQL client pool from the 'pg' module
import { Pool } from 'pg';

// Load configuration values (e.g., DATABASE_URL) from env
import { config } from './env';

// Create and export a PostgreSQL connection pool
export const pool = new Pool({
  // Connection string to your PostgreSQL database
  connectionString: config.DATABASE_URL,

  // Allow SSL connection without validating certificate (required for some hosted services like Render)
  ssl: { rejectUnauthorized: false }
});
