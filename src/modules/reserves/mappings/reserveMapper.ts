import Reserve from "../entity/Reserve";
import ReserveResponse from "../response/ReserveResponse";

export default class UserMapper {
  public static entitiesToDTO(reserves: Reserve[]) {
    const reserveResponse = [];

    for (const reserve of reserves) {
      const reserveDTO = new ReserveResponse(
        reserve._id,
        reserve.id_user,
        reserve.start_date,
        reserve.end_date,
        reserve.id_car,
        reserve.final_value,
      );
      reserveResponse.push(reserveDTO as ReserveResponse);
    }
    return reserveResponse;
  }

  public static entityToDTO(reserve: Reserve) {
    const reserveDTO = new ReserveResponse(
      reserve._id,
      reserve.id_user,
      reserve.start_date,
      reserve.end_date,
      reserve.id_car,
      reserve.final_value,
    );
    return reserveDTO as ReserveResponse;
  }
}
