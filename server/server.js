const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use("/", authRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});