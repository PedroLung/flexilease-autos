import { AppDataSource } from "../typeorm/data-source";
import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

AppDataSource.initialize()
  .then()
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
