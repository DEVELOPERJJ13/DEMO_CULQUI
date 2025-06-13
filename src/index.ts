import express from "express";
import dotenv from "dotenv";
import tokenRoutes from "./routes/token.routes";
import { connectMongo } from "./config/mongo";
import { validatePublicKey } from "./middlewares/validatePublicKey";

dotenv.config();
const app = express();

connectMongo();

const PORT = process.env.PORT;

app.use(express.json());
app.use("/tokens", validatePublicKey, tokenRoutes);

app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
})