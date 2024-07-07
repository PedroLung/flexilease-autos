import { ObjectId } from "mongodb";
import CarService from "../services/CarService";
import { Request, Response } from "express";
import updateCarSchema from "../validations/carUpdateValidation";
import schemaCarCreate from "../validations/carCreateValidation";

export default class CarController {
  carService = new CarService();

  createCar = async (req: Request, res: Response) => {
    try {
      const { error, value } = schemaCarCreate.validate(req.body);

      if (error) {
        const err = {
          message: error.details[0].message,
          field: error.details[0].context?.label,
          status: "Failed",
        };
        return res.status(400).json(err);
      }
      const createCar = await this.carService.createCar(value);

      res.status(201).json({ data: createCar });
    } catch (error) {
      return res.status(400).json({
        message: error,
        status: "Bad Request",
      });
    }
  };

  updateCar = async (req: Request, res: Response) => {
    try {
      const { error, value } = updateCarSchema.validate({
        _id: req.params.id,
        ...req.body,
      });

      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.details[0].message,
        });
      }

      const updateCar = await this.carService.updateCar(value);

      res.status(200).json({ data: updateCar });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  };

  deleteCar = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await this.carService.deleteCar(new ObjectId(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  searchCar = async (req: Request, res: Response) => {
    const id = new ObjectId(req.params.id);

    try {
      const car = await this.carService.searchCar(id);

      res.status(200).json({ data: car });
    } catch (error) {
      console.error("Error searching Car: ", error);
      res.status(404).json({ error: "Car not found" });
    }
  };

  listCars = async (req: Request, res: Response) => {
    try {
      const offset = Number(req.query.page) | 1;
      const limit = Number(req.query.limit) | 10;
      const skip = (offset - 1) * limit;

      const [cars, total] = await this.carService.listCar(skip, limit);

      const offsets = Math.ceil(total / limit);

      if (cars.length > 0) {
        return res.status(200).json({
          cars,
          total,
          limit,
          offset: offset,
          offsets: offsets,
        });
      } else {
        return res.status(204).send();
      }
    } catch (error) {
      console.error("Error listing cars: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
