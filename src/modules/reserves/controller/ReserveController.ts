import { Request, Response } from "express";
import ReserveService from "../service/ReserveService";
import schemaReserveCreate from "../validations/reserveCreateValidation";
import schemaReserveUpdate from "../validations/reserveUpdateValidation";
import { ObjectId } from "mongodb";

export default class ReserveController {
  reserveService = new ReserveService();

  createReserve = async (req: Request, res: Response) => {
    try {
      const { error, value } = schemaReserveCreate.validate(req.body);

      if (error) {
        const err = {
          message: error.details[0].message,
          field: error.details[0].context?.label,
          status: "Failed",
        };
        return res.status(400).json(err);
      }

      const createReserve = await this.reserveService.createReserve(value);

      res.status(201).json({ data: createReserve });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
        status: "Bad Request",
      });
    }
  };

  updateReserve = async (req: Request, res: Response) => {
    try {
      const { error, value } = schemaReserveUpdate.validate({
        _id: req.params.id,
        ...req.body,
      });

      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.details[0].message,
        });
      }

      const updateReserve = await this.reserveService.updateReserve(value);

      res.status(200).json({ data: updateReserve });
    } catch (error: any) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  };

  deleteReserve = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await this.reserveService.deleteReserve(new ObjectId(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  searchReserve = async (req: Request, res: Response) => {
    const id = new ObjectId(req.params.id);

    try {
      const reserve = await this.reserveService.searchReverse(id);

      res.status(200).json({ data: reserve });
    } catch (error) {
      console.error("Error searching movie: ", error);
      res.status(404).json({ error: "Reserve not found" });
    }
  };

  listReserve = async (req: Request, res: Response) => {
    try {
      const offset = Number(req.query.page) | 1;
      const limit = Number(req.query.limit) | 10;
      const skip = (offset - 1) * limit;

      const [reserves, total] = await this.reserveService.listReserve(
        skip,
        limit,
      );

      const offsets = Math.ceil(total / limit);

      if (reserves.length > 0) {
        return res.status(200).json({
          reserves,
          total,
          limit,
          offset: offset,
          offsets: offsets,
        });
      } else {
        return res.status(204).send();
      }
    } catch (error) {
      console.error("Error listing reserves: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
