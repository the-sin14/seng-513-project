import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

// creating the token
/**
 * Generates a JWT token with user ID and email as payload.
 * @param id - User ID
 * @param email - User's email
 * @param expiresIn - Expiration time for the token
 * @returns JWT token
 */

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

// verifying the token
/**
 * Middleware to verify JWT tokens in incoming requests.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Next function in the middleware chain
 * @returns Promise that resolves if the token is valid, rejects on error
 */

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};