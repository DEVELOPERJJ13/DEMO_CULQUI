import { NextFunction, Request, Response } from "express";
import { CardSchema } from "../schemas/card.schema";

export function validateCardInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const parsed = CardSchema.safeParse(req.body);

  if (!parsed.success) {
    const formattedErrors = parsed.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    res.status(400).json({
      error: "Invalid input",
      details: formattedErrors,
    });
    
    return;
  }

  req.body = parsed.data;
  next();
}
