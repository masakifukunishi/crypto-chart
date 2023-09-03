import express from "express";
import ohlcvRoutes from "./ohlcv";
import constantsRoutes from "./constants";
import configsRouters from "./configs";

const router = express.Router();

router.use("/ohlcv", ohlcvRoutes);
router.use("/constants", constantsRoutes);
router.use("/configs", configsRouters);

export default router;
