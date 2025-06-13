import { Request, Response } from "express";
import { CardInput } from "../schemas/card.schema";
import { generateRandomToken } from "../utils/generateToken";
import cardTokenModel from "../models/card-token.model";

export async function tokenizeCard(req: Request, res: Response) {
  try {
    const cardData: CardInput = req.body;

    const token = generateRandomToken(16);
    const savedCardToken = await cardTokenModel.create({
      card_number: cardData.card_number,
      cvv: cardData.cvv,
      expiration_month: cardData.expiration_month,
      expiration_year: cardData.expiration_year,
      email: cardData.email,
      token: token,
    });

    res.status(201).json({
      token: savedCardToken.token,
    });
  } catch (error) {
    console.error("Error tokenizing card:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getCardData(req: Request, res: Response) {
  try {
    const token = req.params.token;
    if (!token || token.length !== 16) {
      res.status(400).json({
        error: "Invalid token format. Token must be 16 characters long.",
      });
    }

    const card = await cardTokenModel.findOne({ token: token });

    if (!card) {
      res.status(404).json({
        error: "Token not found or expired.",
      });
      return;
    }

    const { card_number, expiration_month, expiration_year, email } = card;

    res.status(200).json({
      card_number,
      expiration_month,
      expiration_year,
      email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}
