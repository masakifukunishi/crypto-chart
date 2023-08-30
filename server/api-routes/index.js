import express from "express";
import candlesRoutes from "./candles.js";

const router = express.Router();

router.use("/candles", candlesRoutes);

export default router;
