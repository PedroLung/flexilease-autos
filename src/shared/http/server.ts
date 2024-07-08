import { AppDataSource } from "../typeorm/data-source";
import express from "express";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../../../swagger.json";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const port = process.env.port;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());

app.use("/api/v1", routes);

AppDataSource.initialize()
  .then()
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
