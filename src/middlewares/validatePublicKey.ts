import { NextFunction, Request, Response } from "express";

const VALID_PUBLIC_KEY = "pk_test_LsRBKejzCOEEWOsw";

export function validatePublicKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(400).json({
      error: "Authorization header is required",
    });
    return;
  }

  const [scheme, key] = authHeader!.split(" ");

  if (scheme !== "Bearer" || !key) {
    res.status(400).json({
      error: "Invalid Authorization format. Use Bearer <token>",
    });
    return;
  }

  const isValidFormat = /^pk_test_[a-zA-Z0-9]{6,}$/;

  if (!isValidFormat.test(key)) {
    res.status(400).json({
      error: "Invalid public key format",
    });
    return;
  }

  if (key !== VALID_PUBLIC_KEY) {
    res.status(401).json({
      error: "Unauthorized: Invalid public key",
    });
    return;
  }

  next();
}
