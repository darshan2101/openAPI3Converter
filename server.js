require("dotenv").config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const openAPISpec = require('./openapi.json');

const app = express();

// Serve OpenAPI 3.0 docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openAPISpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
