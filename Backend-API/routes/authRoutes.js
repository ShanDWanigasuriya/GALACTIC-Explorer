//authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User');

const router = express.Router();

// Sign-up endpoint
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received sign-up request:', { name, email, password }); // Add this line to log the request body
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.json('User already exists');
        } else {
            // Hash password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user with hashed password
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();
            
            res.json('User created successfully');
        }

    } catch (error) {
        console.error(error);
        res.json('Internal server error');
    }
});

// Sign-in endpoint
router.post('/signin', async (req, res) => {
    const { name, password } = req.body;
    console.log('Received sign-in request:', { name, password }); // Corrected log message
    try {
        // Find the user by name
        const user = await User.findOne({ name: name });
        if (user) {
            // Compare entered password with hashed password in the database
            const isValidPassword = await bcrypt.compare(password, user.password);
            
            if (isValidPassword) {
                // Generate JWT token
                const token = jwt.sign({ name: name }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ message: 'Sign in successful', token: token });
            } else {
                // Incorrect password
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            // User not found
            res.status(401).json({ message: 'User not found' }); // Updated error message
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;