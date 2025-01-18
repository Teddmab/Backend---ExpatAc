const { handleError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const errorMiddleware = (err, req, res, next) => {
  // Log unexpected errors
  if (!err.statusCode) {
    logger.error('Unexpected error', {
      error: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method
    });
  }

  handleError(err, req, res);
};

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', {
    reason: reason.message,
    stack: reason.stack
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', {
    error: error.message,
    stack: error.stack
  });
  process.exit(1);
});

module.exports = errorMiddleware;