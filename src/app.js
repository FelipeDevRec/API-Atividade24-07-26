const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => res.status(200).json({ status: 'UP', message: 'Nexus API is running' }));
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', checkoutRoutes);

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
