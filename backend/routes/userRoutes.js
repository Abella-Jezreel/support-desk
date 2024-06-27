// Importing necessary modules
const express = require("express");
const router = express.Router(); // Creating a new router object to handle routes
const { registerUser, loginUser } = require("../controllers/userController"); // Importing controller functions

// Route for user registration
// @desc: Handles user registration requests.
// @route: POST /api/users/register
// @access: Public
router.post("/register", registerUser);

// Route for user login
// @desc: Handles user login requests.
// @route: POST /api/users/login
// @access: Public
router.post("/login", loginUser);

// Exporting the router to be used in other parts of the application
module.exports = router;