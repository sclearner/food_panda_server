"use strict";
const express = require('express');
const connectDB = require('./database/db.js');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const menuRoutes = require('./routes/menu');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

const router = express.Router();

// Define authentication routes
router.use('/auth', authRoutes);

// Define user routes
router.use('/user', userRoutes);

// Define menu routes
router.use('/menu', menuRoutes);

// Final app
app.use('/api/v1', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});