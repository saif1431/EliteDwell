const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utlils/error.js'); // Ensure this is imported

const signUp = async (req, res, next) => {
    const { userName, email, password } = req.body; // Extract fields from req.body

    // Validate input
    if (!userName || !email || !password || userName === '' || email === '' || password === '') {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashPassword = bcrypt.hashSync(password, 10); // Hash the password
    // Create a new user
    const newUser = new User({
        userName,
        email,
        password: hashPassword,
    });

    try {
        await newUser.save(); // Save the user to the database
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};

const signIn = async (req, res, next) => {
    const { email, password } = req.body; // Extract fields from req.body

    try {
        const Validate = await User.findOne({ email }); // Find the user by email
        if (!Validate) return next(errorHandler(401, 'User not found'));

        const matchPassword = bcrypt.compareSync(password, Validate.password); // Compare the password
        if (!matchPassword) return next(errorHandler(401, 'Invalid Credentials'));

        const token = jwt.sign({ id: Validate._id }, process.env.JWT_SECRET); // Generate a JWT token
        const { password: pass, ...rest } = Validate._doc;

        res.cookie('access_token', token, { httpOnly: true, sameSite: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};


const google  = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true, sameSite: true })
                .status(200)
                .json(rest);
        }
        else{
            const generatePassword= Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcrypt.hashSync(generatePassword, 10);
            const newUser = new User({
                userName: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashPassword,
                avatar: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true, sameSite: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
}


module.exports = { signUp, signIn, google }; // Export the functions