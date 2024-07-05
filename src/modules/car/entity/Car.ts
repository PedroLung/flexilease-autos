import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class Car {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  year: string;

  @Column()
  value_per_day: number;

  @Column()
  accessories: Accessory[];

  @Column()
  number_of_passengers: number;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @DeleteDateColumn()
  deleted_at: Timestamp;
}

interface Accessory {
  itemId?: number; // itemId is optional as it will be auto-generated
  description: string;
}
