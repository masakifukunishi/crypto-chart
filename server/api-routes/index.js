import express from "express";
import ohlcvRoutes from "./ohlcv.js";
import constantsRoutes from "./constants.js";
import configsRouters from "./configs.js";

const router = express.Router();

router.use("/ohlcv", ohlcvRoutes);
router.use("/constants", constantsRoutes);
router.use("/configs", configsRouters);

export default router;
