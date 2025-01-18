const logger = require('./logger');

class AppError extends Error {
  constructor(message, statusCode, details = {}) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleError = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Log error details
  logger.error('Error occurred', {
    statusCode,
    message,
    path: req.path,
    method: req.method,
    userId: req?.user?.id,
    details: err.details,
    stack: err.stack
  });

  // Send response to client
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { details: err.details })
  });
};

module.exports = {
  AppError,
  handleError
};