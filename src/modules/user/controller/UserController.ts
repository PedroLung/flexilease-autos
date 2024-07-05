import { Request, Response } from "express";
import UserService from "../services/UserService";
import { ObjectId } from "mongodb";
import updateUserSchema from "../validations/userUpdateValidation";
import schemaUserCreate from "../validations/userCreateValidation";

export default class UserController {
  userService = new UserService();

  createUser = async (req: Request, res: Response) => {
    try {
      const { error, value } = schemaUserCreate.validate(req.body);

      if (error) {
        const err = {
          message: error.details[0].message,
          field: error.details[0].context?.label,
          status: "Failed",
        };
        return res.status(400).json(err);
      }

      const createUser = await this.userService.createUser(value);

      res.status(201).json({ data: createUser });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
        status: "Bad Request",
      });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { error, value } = updateUserSchema.validate({
        _id: req.params.id,
        ...req.body,
      });

      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.details[0].message,
        });
      }

      const updateUser = await this.userService.updateUser(value);

      res.status(200).json({ data: updateUser });
    } catch (error: any) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await this.userService.deleteUser(new ObjectId(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  searchUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const user = await this.userService.searchUser(new ObjectId(id));

      res.status(200).json({ data: user });
    } catch (error) {
      console.error("Error searching movie: ", error);
      res.status(404).json({ error: "User not found" });
    }
  };

  listUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.listUser();
      if (users) {
        return res.status(200).json({ user: users });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error listing users: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
