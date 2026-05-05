const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MeetMux API',
            version: '1.0.0',
            description: 'API Contract for Activities'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ['./routes/*.js'], // scan routes for docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;