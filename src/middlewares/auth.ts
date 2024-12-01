import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET || "default_secret", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // Attach user to the request object
    next();
  });
};
