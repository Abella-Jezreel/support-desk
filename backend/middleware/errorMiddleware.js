const errorHandler = (err, req, res, next) => {
  // Log to console for developer
  console.log(err.stack);

  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  // Send a JSON response with the error message and a stack trace (only in development)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
