import { UserRepository } from "../repositories/UserRepository";
import AuthRequest from "../request/AuthRequest";
import AuthResponse from "../response/AuthResponse";
import jwt from "jsonwebtoken";
import authConfig from "../../../config/auth.json";

export default class AuthService {
  createAuth = async (authData: AuthRequest): Promise<AuthResponse> => {
    const { email, password } = authData;

    const user = await UserRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.password !== password) {
      throw new Error("User not found");
    }

    const token = jwt.sign({ id: user._id }, authConfig.secret, {
      expiresIn: 86400,
    });

    return new AuthResponse(user.email, user.password, token);
  };
}
