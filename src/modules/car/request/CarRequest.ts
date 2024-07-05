import { ObjectId } from "mongodb";

interface Accessory {
  itemId?: number; // itemId is optional as it will be auto-generated
  description: string;
}

export default class CarRequest {
  _id?: ObjectId | undefined;
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: Accessory[];
  number_of_passengers: number;

  constructor(
    _id: ObjectId,
    model: string,
    color: string,
    year: string,
    value_per_day: number,
    accessories: Accessory[],
    number_of_passengers: number,
  ) {
    (this._id = _id),
      (this.model = model),
      (this.color = color),
      (this.year = year),
      (this.value_per_day = value_per_day),
      (this.accessories = accessories),
      (this.number_of_passengers = number_of_passengers);
  }
}
