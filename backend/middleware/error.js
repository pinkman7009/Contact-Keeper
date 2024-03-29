const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  //   console.log(err.stack.red.bold);

  let error = { ...err };

  error.message = err.message;

  // Mongoose bad ObjectID
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  // Mongoose Duplicate Key

  //   if (err.code === 11000) {
  //     const message = `Duplicate field value entered`;
  //     error = new ErrorResponse(message, 400);
  //   }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(error.errors).map((value) => value.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
