import { ReserveRepository } from "../repositories/ReserveRepository";
import ReserveRequest from "../request/ReserveRequest";
import ReserveResponse from "../response/ReserveResponse";
import { UserRepository } from "../../user/repositories/UserRepository";
import { CarRepository } from "../../car/repositories/CarRepository";
import { ObjectId } from "mongodb";
import ReserveMapper from "../mappings/reserveMapper";

export default class ReserveService {
  createReserve = async (
    reserveData: ReserveRequest,
  ): Promise<ReserveResponse> => {
    const reserve = ReserveRepository.create({
      start_date: reserveData.start_date,
      end_date: reserveData.end_date,
      id_car: reserveData.id_car,
      id_user: reserveData.id_user,
    });

    const user = await UserRepository.findOne({
      where: { _id: reserve.id_user },
    });

    if (user?.qualified === "no") {
      throw new Error("Must have a driver's license.");
    }

    const existingReserve = await ReserveRepository.findOne({
      where: { id_user: reserve.id_user },
    });

    if (existingReserve) {
      throw new Error("You already have a reservation");
    }

    const car = await CarRepository.findOneOrFail({
      where: { _id: new ObjectId(reserve.id_car) },
    });

    function calculateDaysDifference(a: Date, b: Date) {
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    }

    let formattedStartDate = reserve.start_date.replace(/\//g, "-");
    const startDateParts = formattedStartDate.split("-");
    const startDateFormatted = new Date(
      `${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`,
    );

    let formattedEndDate = reserve.end_date.replace(/\//g, "-");
    const endDateParts = formattedEndDate.split("-");
    const endDateFormatted = new Date(
      `${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`,
    );

    if (car) {
      let valuePerDay = car?.value_per_day;

      const value =
        calculateDaysDifference(startDateFormatted, endDateFormatted) *
        valuePerDay;

      reserve.final_value = value;
    } else {
      throw new Error("Something went wrong");
    }

    const reservedCar = await ReserveRepository.findOne({
      where: {
        id_car: reserveData.id_car,
        start_date: reserveData.start_date,
      },
    });

    if (reservedCar) {
      throw new Error("This car has already been rented");
    }

    await ReserveRepository.save(reserve);

    return new ReserveResponse(
      reserve._id,
      reserve.id_user,
      reserve.start_date,
      reserve.end_date,
      reserve.id_car,
      reserve.final_value,
    );
  };

  updateReserve = async (
    reserveData: ReserveRequest,
  ): Promise<ReserveResponse> => {
    console.log(reserveData);

    const reserve = await ReserveRepository.findOne({
      where: { _id: new ObjectId(reserveData._id) },
    });

    if (!reserve) {
      throw new Error("Reserve not found");
    }

    reserve.id_user = reserveData.id_user;
    reserve.start_date = reserveData.start_date;
    reserve.end_date = reserveData.end_date;
    reserve.id_car = reserveData.id_car;

    const car = await CarRepository.findOneOrFail({
      where: { _id: new ObjectId(reserve.id_car) },
    });

    function dateDiferencaEmDias(a: Date, b: Date) {
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    }

    let data1 = reserve.start_date.replace(/\//g, "-");
    const partes1 = data1.split("-");
    const dataFormatada1 = new Date(
      `${partes1[2]}-${partes1[1]}-${partes1[0]}`,
    );
    let data2 = reserve.end_date.replace(/\//g, "-");
    const partes2 = data2.split("-");
    const dataFormatada2 = new Date(
      `${partes2[2]}-${partes2[1]}-${partes2[0]}`,
    );

    if (car) {
      let value_per_day = car?.value_per_day;

      const value =
        dateDiferencaEmDias(dataFormatada1, dataFormatada2) * value_per_day;

      reserve.final_value = value;
    } else {
      throw new Error("Something went wrong");
    }

    await ReserveRepository.save(reserve);

    return new ReserveResponse(
      reserve._id,
      reserve.id_user,
      reserve.start_date,
      reserve.end_date,
      reserve.id_car,
      reserve.final_value,
    );
  };

  deleteReserve = async (_id: ObjectId) => {
    const Reserve = await ReserveRepository.findOneOrFail({
      where: { _id },
    });
    if (!Reserve) {
      throw new Error("Reserve not found");
    }
    await ReserveRepository.softRemove(Reserve);
    return;
  };

  searchReserve = async (id: ObjectId): Promise<ReserveResponse> => {
    const reserve = await ReserveRepository.findOneOrFail({
      where: { _id: id },
    });
    if (reserve) {
      return ReserveMapper.entityToDTO(reserve);
    }
    throw new Error("Movie not found");
  };

  listReserve = async (
    skip: number,
    limit: number,
  ): Promise<[ReserveResponse[], number]> => {
    const [reserves, total] = await ReserveRepository.findAndCount({
      skip,
      take: limit,
    });

    return [ReserveMapper.entitiesToDTO(reserves), total];
  };
}
