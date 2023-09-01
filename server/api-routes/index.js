import express from "express";
import ohlcvRoutes from "./ohlcv.js";
import constantsRoutes from "./constants.js";

const router = express.Router();

router.use("/ohlcv", ohlcvRoutes);
router.use("/constants", constantsRoutes);

export default router;
