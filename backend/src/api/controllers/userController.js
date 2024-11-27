const User = require('../models/User'); 
const bcrypt = require('bcryptjs');

// User signup
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({
            message: "User created successfully.",
            user_id: newUser._id,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Error creating user: " + error.message,
        });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password.",
            });
        }

        res.status(200).json({
            message: "Login successful.",
            user_id: user._id,
            // Optionally return a JWT token here
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server error: " + error.message,
        });
    }
};
