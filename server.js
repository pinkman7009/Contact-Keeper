const express = require('express');

const app = express();

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const contactRoutes = require('./routes/contacts');

// Mounting the routes
app.use('/api/users', usersRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on Port: ${PORT}`));
