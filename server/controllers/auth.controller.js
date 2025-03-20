const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

const signUp = async (req, res, next) => {
    const { userName, email, password } = req.body; // Extract fields from req.body

    // Validate input
    if (!userName || !email || !password || userName === '' || email === '' || password === '') {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashPassword= bcrypt.hashSync(password, 10); // Hash the password
    // Create a new user
    const newUser = new User({
        userName,
        email,
        password : hashPassword,
    });

    try {
        await newUser.save(); // Save the user to the database
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = { signUp };