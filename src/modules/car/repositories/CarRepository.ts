import { AppDataSource } from "../../../shared/typeorm/data-source";
import Car from "../entity/Car";

export const CarRepository = AppDataSource.getRepository(Car).extend({});
