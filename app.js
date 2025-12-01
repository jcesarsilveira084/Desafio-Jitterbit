// app.js - Entry point for Jitterbit Order API
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('express-async-errors'); // to handle async errors without try/catch in express routes

const orderRoutes = require('./routes/orderRoutes');
const { errorHandler, notFoundHandler } = require('./utils/errorHandlers');

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/order', orderRoutes);

// Healthcheck
app.get('/', (req, res) => res.json({ ok: true, message: 'Jitterbit Order API' }));

// 404 and error handlers
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start server
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jitterbit_orders';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});
