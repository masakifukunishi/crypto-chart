import express from "express";
import ohlcvRoutes from "./ohlcv.js";

const router = express.Router();

router.use("/ohlcv", ohlcvRoutes);

export default router;
