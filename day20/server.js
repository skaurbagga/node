/*const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./swagger');
const activityRoutes = require('./routes/activityRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// ---------------- ROUTES ---------------- 
app.use('/api', activityRoutes);

// ---------------- SWAGGER DOCS ---------------- 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---------------- SERVER ---------------- 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger Docs at http://localhost:${PORT}/api-docs`);
});*/



/*const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger_config');
const activityRoutes = require('./routes/activityRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// ---------------- API ROUTES ---------------- 
app.use('/api', activityRoutes);

// ---------------- SWAGGER DOCS ---------------- 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---------------- SERVER ---------------- 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Docs available at http://localhost:${PORT}/api-docs`);
});*/


const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger_config');
const activityRoutes = require('./routes/activityRoutes');

const app = express();

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use('/api', limiter);

app.use(express.json());
app.use('/api', activityRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* -------- EXPORT APP (IMPORTANT) -------- */
module.exports = app;

/* -------- START SERVER ONLY IF DIRECT RUN -------- */
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

