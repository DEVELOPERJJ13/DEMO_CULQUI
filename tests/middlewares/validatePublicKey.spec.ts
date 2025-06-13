import { Request, Response } from "express";
import { validatePublicKey } from "../../src/middlewares/validatePublicKey";

describe("validatePublicKey middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("Permitir el acceso con la public key válida", () => {
    req.headers = {
      authorization: "Bearer pk_test_LsRBKejzCOEEWOsw",
    };

    validatePublicKey(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("Rechazar si no se envía Authorization header", () => {
    req.headers = {};

    validatePublicKey(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Authorization header is required",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("Rechazar si el formato del header es incorrecto", () => {
    req.headers = {
      authorization: "pk_test_LsRBKejzCOEEWOsw", // falta el "Bearer"
    };

    validatePublicKey(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid Authorization format. Use Bearer <token>",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("Rechazar si el formato de la clave es inválido", () => {
    req.headers = {
      authorization: "Bearer pk_test_invalid!",
    };

    validatePublicKey(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid public key format",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("Rechazar si la clave es válida en formato pero no coincide", () => {
    req.headers = {
      authorization: "Bearer pk_test_abcdef123456",
    };

    validatePublicKey(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Unauthorized: Invalid public key",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
