const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Platform Core API',
      version: '1.0.0',
      description: 'API Documentation for Activity-Based Networking platform',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // scans route files
};

module.exports = swaggerJsdoc(options);