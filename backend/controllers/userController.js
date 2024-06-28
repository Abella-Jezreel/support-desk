const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


// Controller for user registration
// @desc: Handles the registration of new users.
// @route: POST /api/users/register
// @access: Public
// This function logs the request body to the console (typically containing user information) and
// responds with a JSON object indicating the route is for user registration.
const registerUser = asyncHandler(async (req, res) => {
  // console.log(req.body); // Log the request body to the console
  const { name, email, password } = req.body; // Destructure the request body to obtain user information

  //Validation
  // Check if any of the fields are empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Find if User already exists
  const userExists = await User.findOne({ email: email })

  if(userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10); // Generate a salt
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

  // Create a new user object
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else { 
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Controller for user login
// @desc: Handles user login requests.
// @route: POST /api/users/login
// @access: Public
// This function responds with a JSON object indicating the route is for user login.
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Destructure the request body to obtain user information
  const user = await User.findOne({ email: email }); // Find the user by email

  // Check if the user exists and the password is correct
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }

});

const profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // Find the user by id

  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Generate a JSON Web Token
// @desc: Generates a JSON Web Token for user authentication.
// @param: id - The user ID to be encoded in the token.
// @returns: A JSON Web Token containing the user ID.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Exporting the controller functions to be used in router definitions
module.exports = {
  registerUser,
  loginUser,
  profile
};
