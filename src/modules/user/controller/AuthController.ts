import { Request, Response } from "express";
import schemaAuthCreate from "../validations/authCreateValidation";
import AuthService from "../services/AuthService";

export default class AuthController {
  authService = new AuthService();

  createAuth = async (req: Request, res: Response) => {
    try {
      const { error, value } = schemaAuthCreate.validate(req.body);

      if (error) {
        const err = {
          message: error.details[0].message,
          field: error.details[0].context?.label,
          status: "Failed",
        };
        return res.status(400).json(err);
      }

      const initAuth = await this.authService.createAuth(value);

      res.status(201).json({ data: initAuth });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
        status: "Bad Request",
      });
    }
  };
}
