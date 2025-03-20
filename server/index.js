const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const userRoute = require('./routers/user.route.js'); // Import user router
const authRoute = require('./routers/auth.route.js'); // Import auth router

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log('Error connecting to the database', err);
    });

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/user', userRoute); // Use user router
app.use('/api/auth', authRoute); // Use auth router


app.use((err, req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message =  err.message || 'Internal Server Error';

    return res.status(statusCode).json({
    success: false,
    statusCode,
    message
    });
})


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});