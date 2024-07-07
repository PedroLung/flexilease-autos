import { ObjectId } from "mongodb";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectIdColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class Reserve {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id_car: ObjectId;

  @Column()
  id_user: ObjectId;

  @Column()
  start_date: string;

  @Column()
  end_date: string;

  @Column()
  final_value: number;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @DeleteDateColumn()
  deleted_at: Timestamp;
}
