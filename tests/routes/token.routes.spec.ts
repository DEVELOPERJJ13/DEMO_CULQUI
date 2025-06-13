import { validateCardInput } from "../../src/middlewares/validateTokenInput";
import { CardInput } from "../../src/schemas/card.schema";
import { Request, Response, NextFunction } from "express";

describe("validateCardInput middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("Pasar al next cuando la entrada es válida", () => {
    const validInput: CardInput = {
      card_number: 4480129803815123,
      cvv: 123,
      expiration_month: "12",
      expiration_year: "2027",
      email: "test@gmail.com",
    };

    req.body = validInput;

    validateCardInput(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(req.body).toEqual(validInput); // asegúrate que parseo exitoso
  });

  it("Devolver 400 si falta un campo requerido", () => {
    req.body = {
      card_number: 4111111111111111,
      cvv: "123",
      expiration_month: "12",
      // falta expiration_year
      email: "test@example.com",
    };

    validateCardInput(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Invalid input",
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("Devolver 400 si el email no es válido", () => {
    req.body = {
      card_number: 4111111111111111,
      cvv: "123",
      expiration_month: "12",
      expiration_year: "2030",
      email: "correo-invalido",
    };

    validateCardInput(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Invalid input",
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("Devolver 400 si el card_number es inválido (formato incorrecto)", () => {
    req.body = {
      card_number: 4422129803815123,
      cvv: 123,
      expiration_month: "12",
      expiration_year: "2027",
      email: "test@gmail.com"
    };

    validateCardInput(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid input",
      details: [
        {
          field: "card_number",
          message: "Card number is invalid",
        },
      ],
    });
    expect(next).not.toHaveBeenCalled();
  });
});
