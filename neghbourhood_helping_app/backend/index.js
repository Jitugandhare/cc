const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const helpRoutes = require('./routes/help');
const chatRoutes = require('./routes/chat');
const notificationRoutes = require('./routes/notification');
const errorHandler  = require('./middleware/errorHandler');



const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse form-encoded data

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/help', helpRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notification', notificationRoutes);



// Error Handler (Custom Middleware)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
    try {
        await connection;
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.log(error)
    }
  
});
