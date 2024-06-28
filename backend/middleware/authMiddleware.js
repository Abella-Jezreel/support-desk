const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Middleware to protect routes
// This middleware checks if the user is logged in and has a valid token
// If the user is logged in, the user object is attached to the request object
// If the user is not logged in, an error is thrown
// The error is caught by the error handling middleware
// The error handling middleware sends a response to the client with the error message
// The error message is displayed on the client side
const protect = asyncHandler(async (req, res, next) => {
    let token;
    
    // Check if the authorization header is present and starts with "Bearer"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
        // Extract the token from the header
        token = req.headers.authorization.split(" ")[1];
    
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        // Find the user in the database
        req.user = await User.findById(decoded.id).select("-password");
    
        next();
        } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
        }
    }
    
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
    });

    module.exports = { protect };