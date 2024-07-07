import { ObjectId } from "mongodb";

export default class ReserveRequest {
  _id?: ObjectId | undefined;
  start_date: string;
  end_date: string;
  id_car: ObjectId;
  id_user: ObjectId;
  final_value: number;

  constructor(
    _id: ObjectId,
    start_date: string,
    end_date: string,
    id_car: ObjectId,
    id_user: ObjectId,
    final_value: number,
  ) {
    (this._id = _id),
      (this.start_date = start_date),
      (this.end_date = end_date),
      (this.id_car = id_car),
      (this.id_user = id_user),
      (this.final_value = final_value);
  }
}
