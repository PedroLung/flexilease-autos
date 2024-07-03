import { ObjectId } from "typeorm";

export default class CarRequest {
  car_id?: ObjectId | undefined;
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  acessories: string[];
  number_of_passengers: number;

  constructor(
    _id: ObjectId,
    model: string,
    color: string,
    year: string,
    value_per_day: number,
    acessories: string[],
    number_of_passengers: number,
  ) {
    (this.car_id = _id),
      (this.model = model),
      (this.color = color),
      (this.year = year),
      (this.value_per_day = value_per_day),
      (this.acessories = acessories),
      (this.number_of_passengers = number_of_passengers);
  }
}
