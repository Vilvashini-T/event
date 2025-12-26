const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// Security Middleware
const mongoSanitize = require('express-mongo-sanitize');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Data Sanitization against NoSQL query injection
// Data Sanitization against NoSQL query injection
// app.use(mongoSanitize()); // FIXME: Incompatible with Express 5.x, causing TypeError

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/events', require('./routes/events'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/registrations', require('./routes/registrations'));
app.get('/', (req, res) => {
    res.send('KEC Smart Campus API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
