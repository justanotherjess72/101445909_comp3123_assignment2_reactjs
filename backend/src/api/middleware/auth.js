const jwt = require('jsonwebtoken');

// Middleware to check if user is authenticated
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from the Authorization header

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Access denied. No token provided.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded; // Attach user information to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Invalid token.",
        });
    }
};

module.exports = authMiddleware;
