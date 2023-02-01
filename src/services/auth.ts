import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY ?? "";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
  userId: string;
}

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    (req as CustomRequest).token = decoded;
    if (typeof decoded === "string") {
      throw new Error();
    }
    (req as CustomRequest).userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
