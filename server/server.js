require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 UrbanCool AI Backend API Server active on port ${PORT}`);
  console.log(`🌍 Health endpoint: http://localhost:${PORT}/api/health`);
  console.log(`📡 Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`====================================================`);
});
