import express from "express";
import { requestErrorHandler } from "../helpers/helper.js";
import { getAllCandles } from "../controllers/candles.js";

const router = express.Router();

router.get("/", requestErrorHandler(getAllCandles));

export default router;
