import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
const port = parseInt(process.env.db_port || "27017");

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: process.env.db_host,
  port: port,
  database: "flexilease-autos",
  logging: false,
  entities: ["./src/modules/**/entity/*.ts"],
  subscribers: [],
});
