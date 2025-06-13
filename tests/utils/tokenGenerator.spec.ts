import { generateRandomToken } from "../../src/utils/generateToken";

describe("generateRandomToken", () => {
  const validChars = /^[A-Za-z0-9]+$/;

  it("Generar un token de 16 caracteres por defecto", () => {
    const token = generateRandomToken();
    expect(token).toHaveLength(16);
    expect(validChars.test(token)).toBe(true);
  });

  it("Generar un token de la longitud especificada", () => {
    const length = 32;
    const token = generateRandomToken(length);
    expect(token).toHaveLength(length);
    expect(validChars.test(token)).toBe(true);
  });

  it("Generar tokens aleatorios", () => {
    const token1 = generateRandomToken();
    const token2 = generateRandomToken();
    const token3 = generateRandomToken();

    // Es altamente improbable que los tokens sean iguales
    expect(token1).not.toEqual(token2);
    expect(token1).not.toEqual(token3);
    expect(token2).not.toEqual(token3);
  });
});
