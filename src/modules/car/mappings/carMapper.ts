import Car from "../entity/Car";
import CarResponse from "../response/CarResponse";

export default class CarMapper {
  public static entitiesToDTO(cars: Car[]) {
    const carResponse = [];

    for (const car of cars) {
      const carDTO = new CarResponse(
        car._id,
        car.model,
        car.color,
        car.year,
        car.value_per_day,
        car.accessories,
        car.number_of_passengers,
      );
      carResponse.push(carDTO.toJson() as CarResponse);
    }
    return carResponse;
  }

  public static entityToDTO(car: Car) {
    const carDTO = new CarResponse(
      car._id,
      car.model,
      car.color,
      car.year,
      car.value_per_day,
      car.accessories,
      car.number_of_passengers,
    );
    return carDTO.toJson() as CarResponse;
  }
}
