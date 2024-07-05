import { AppDataSource } from "../typeorm/data-source";
import express from "express";
import routes from "./routes";

const app = express();

const port = 3000;

app.use(express.json());

app.use("/api/v1", routes);

AppDataSource.initialize()
  .then()
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
