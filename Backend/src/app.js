const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const env = require('./config/env');
const authRoutes = require('./routes/auth.routes');
const studentRoutes = require('./routes/student.routes');
const staffRoutes = require('./routes/staff.routes');
const adminRoutes = require('./routes/admin.routes');
const admissionsRoutes = require('./routes/admissions.routes');
const publicRoutes = require('./routes/public.routes');

const app = express();

const allowedOrigins = env.CORS_ORIGINS;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests. Please try again later.'
  })
);

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    data: { status: 'ok' },
    meta: { env: env.NODE_ENV }
  });
});

app.get('/ready', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Service is ready',
    data: { ready: true }
  });
});

app.use('/api/v1', publicRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/staff', staffRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/admissions', admissionsRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    code: 'ROUTE_NOT_FOUND',
    details: []
  });
});

app.use((error, req, res, next) => {
  if (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred.',
      code: 'INTERNAL_SERVER_ERROR',
      details: []
    });
  }
  next();
});

module.exports = app;
