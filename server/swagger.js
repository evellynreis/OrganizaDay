const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OrganizaDay API",
      version: "1.0.0",
      description: "Documentação da API do OrganizaDay",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [__dirname + "/routes/*.js", __dirname + "/controllers/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;