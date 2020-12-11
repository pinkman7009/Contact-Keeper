const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

const app = express();

const connectDB = require('./backend/config/db');
const errorHandler = require('./backend/middleware/error');

// Route files
const authRoutes = require('./backend/routes/auth');
const usersRoutes = require('./backend/routes/users');
const contactRoutes = require('./backend/routes/contacts');

dotenv.config();

// Connecting to database
connectDB();

app.use(express.json());

// Mounting the routes
app.use('/api/users', usersRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);

// Mount error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server started on Port: ${PORT}`.yellow.underline.bold)
);
