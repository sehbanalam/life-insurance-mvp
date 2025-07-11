// Load environment variables from .env file into process.env
import dotenv from 'dotenv';
dotenv.config();

// Export a strongly-typed config object for use throughout the app
export const config = {
  // Server port (default: 5000 if not set in env)
  PORT: process.env.PORT || 5000,

  // PostgreSQL connection string (must be defined in .env)
  DATABASE_URL: process.env.DATABASE_URL || '',
};
