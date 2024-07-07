import { AppDataSource } from "../../../shared/typeorm/data-source";
import Reserves from "../entity/Reserve";

export const ReserveRepository = AppDataSource.getRepository(Reserves).extend(
  {},
);
