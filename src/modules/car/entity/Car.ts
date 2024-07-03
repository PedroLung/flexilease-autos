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

  @Column("simple-array")
  acessories: string[];

  @Column()
  number_of_passengers: number;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @DeleteDateColumn()
  deleted_at: Timestamp;

  constructor(
    _id: ObjectId,
    model: string,
    color: string,
    year: string,
    value_per_day: number,
    acessories: string[],
    number_of_passengers: number,
    created_at: Timestamp,
    updated_at: Timestamp,
    deleted_at: Timestamp,
  ) {
    (this._id = _id),
      (this.model = model),
      (this.color = color),
      (this.year = year),
      (this.value_per_day = value_per_day),
      (this.acessories = acessories),
      (this.number_of_passengers = number_of_passengers),
      (this.created_at = created_at),
      (this.updated_at = updated_at),
      (this.deleted_at = deleted_at);
  }
}
