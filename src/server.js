require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { initializeDatabase } = require('./config/db');
const routes = require('./routes');
const requestLogger = require('./middleware/requestLogger');
const errorMiddleware = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// API Documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "ExpatAcademy API Documentation"
}));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
      logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('Server startup failed', { error: error.message });
    process.exit(1);
  }
};

startServer();