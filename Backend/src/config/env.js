require('dotenv').config();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 5000),
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/trsu_demo',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  SESSION_SECRET: process.env.SESSION_SECRET || 'change-me-in-production',
  CSRF_SECRET: process.env.CSRF_SECRET || 'change-me-in-production',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  CORS_ORIGINS: (process.env.CORS_ORIGINS || 'http://localhost:5173').split(',')
};

module.exports = env;
