import { Router } from "express";
import { validateCardInput } from "../middlewares/validateTokenInput";
import { getCardData, tokenizeCard } from "../controllers/token.controller";

const router = Router();

router.post("/", validateCardInput, tokenizeCard);
router.get("/:token", getCardData);

export default router;