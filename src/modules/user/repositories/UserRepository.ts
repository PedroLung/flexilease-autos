import { AppDataSource } from "../../../shared/typeorm/data-source";
import User from "../entity/User";

export const UserRepository = AppDataSource.getRepository(User).extend({});
