const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const passport = require('passport');

const userRegister = async (req, res) => {
    try {

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const userLogin = async (req, res) => {
    try {
        // Check if user with given email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({ message: 'Login successful', token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const userAuth = passport.authenticate('jwt', { session: false });

module.exports = {
    userRegister,
    userLogin,
    userAuth
}