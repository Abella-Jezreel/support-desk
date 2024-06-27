const express = require("express");

const colors = require("colors");

const { connectDB } = require("./config/db");

// Connect to the database
connectDB();

// Load environment variables from .env file
require("dotenv").config();

const { errorHandler } = require("./middleware/errorMiddleware");

// Retrieve the PORT number from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Initialize the express application
const app = express();

// Middlewares
// @desc: This middleware is used to parse JSON bodies. This allows you to send JSON data to the server and access it via req.body.
app.use(express.json());
// @desc: This middleware is used to parse URL-encoded bodies. This is important for forms submitted via HTTP POST method.
// @desc: The { extended: false } option means that the values can be only strings or arrays. When true, any type can be a value.
app.use(express.urlencoded({ extended: false }));

// Home route
// @desc: Serves the home route of the API.
// @desc: Responds with a welcome message in JSON format indicating successful connection to the API.
app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to Support Desk API",
    });
  });

// Routes
// @desc: Mounts the user routes on the "/api/users" path.
// @desc: Any request to "/api/users" will be forwarded to the userRoutes module for handling.
app.use("/api/users", require("./routes/userRoutes"));

// Error handling middleware
// @desc: Middleware to handle errors in the application.
// @desc: This middleware is used to catch any errors that occur during the request-response cycle.
app.use(errorHandler);

// Server startup
// @desc: Starts the server and listens on the specified PORT.
// @desc: Logs a message to the console indicating the server is running and on which port.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
