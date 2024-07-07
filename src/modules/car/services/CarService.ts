import { ObjectId } from "mongodb";
import CarMapper from "../mappings/carMapper";
import { CarRepository } from "../repositories/CarRepository";
import CarRequest from "../request/CarRequest";
import CarResponse from "../response/CarResponse";

export default class CarService {
  createCar = async (carData: CarRequest): Promise<CarResponse> => {
    const accessories = carData.accessories.map((a: any, index: number) => ({
      itemId: index + 1,
      description: a.description,
    }));
    const car = CarRepository.create({
      model: carData.model,
      color: carData.color,
      year: carData.year,
      value_per_day: carData.value_per_day,
      accessories: accessories,
      number_of_passengers: carData.number_of_passengers,
    });

    await CarRepository.save(car);

    return new CarResponse(
      car._id,
      car.model,
      car.color,
      car.year,
      car.value_per_day,
      car.accessories.map((accessory) => ({
        description: accessory.description,
      })),
      car.number_of_passengers,
    );
  };

  updateCar = async (carData: CarRequest): Promise<CarResponse> => {
    const car = await CarRepository.findOne({
      where: { _id: new ObjectId(carData._id) },
    });
    if (!car) {
      throw new Error("Car not found");
    }

    car.model = carData.model;
    car.color = carData.color;
    car.year = carData.year;
    car.value_per_day = carData.value_per_day;
    car.accessories = carData.accessories;
    car.number_of_passengers = carData.number_of_passengers;

    await CarRepository.save(car);

    return new CarResponse(
      car._id,
      car.model,
      car.color,
      car.year,
      car.value_per_day,
      car.accessories,
      car.number_of_passengers,
    );
  };

  deleteCar = async (_id: ObjectId) => {
    const Car = await CarRepository.findOneOrFail({
      where: { _id },
    });
    if (!Car) {
      throw new Error("Car not found");
    }
    await CarRepository.softRemove(Car);
    return;
  };

  searchCar = async (id: ObjectId): Promise<CarResponse> => {
    const car = await CarRepository.findOneOrFail({
      where: { _id: id },
    });
    if (car) {
      return CarMapper.entityToDTO(car);
    }
    throw new Error("Car not found");
  };

  listCar = async (
    skip: number,
    limit: number,
  ): Promise<[CarResponse[], number]> => {
    const [cars, total] = await CarRepository.findAndCount({
      skip,
      take: limit,
    });

    return [CarMapper.entitiesToDTO(cars), total];
  };
}
