import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.json";

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "No token provided." });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).send({ error: "Invalid token." });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token malformatted." });
  }

  jwt.verify(token, authConfig.secret, (err) => {
    if (err) return res.status(401).send({ error: "Invalid token." });

    return next();
  });
};
