// Backend - Express Server
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongooseConnection = require('./config/database');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongooseConnection();

// Routes
app.use('/api/todos', todoRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running ✅' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found', message: 'Please check the API endpoint' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API Base URL: http://localhost:${PORT}/api`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
});
