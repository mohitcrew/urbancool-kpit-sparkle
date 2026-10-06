const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Mount API routes
app.use('/api', apiRoutes);

// Root test
app.get('/', (req, res) => {
  res.json({
    name: 'UrbanCool AI Backend Service',
    description: 'AI-Powered Urban Heat Mitigation & Cooling Decision Support Platform (KPIT Sparkle 2027)',
    apiDocumentation: '/api/health'
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint Not Found' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

module.exports = app;
