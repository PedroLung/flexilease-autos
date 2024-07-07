import { ObjectId } from "mongodb";

export default class ReserveResponse {
  _id: ObjectId;
  id_user: ObjectId;
  start_date: string;
  end_date: string;
  id_car: ObjectId;
  final_value: number;

  constructor(
    _id: ObjectId,
    id_user: ObjectId,
    start_date: string,
    end_date: string,
    id_car: ObjectId,
    final_value: number,
  ) {
    (this._id = _id),
      (this.id_user = id_user),
      (this.start_date = start_date),
      (this.end_date = end_date),
      (this.id_car = id_car),
      (this.final_value = final_value);
  }
}
