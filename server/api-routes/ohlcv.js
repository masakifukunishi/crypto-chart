import express from "express";
import { requestErrorHandler } from "../helpers/helper.js";
import { getOhlcv } from "../controllers/ohlcv.js";

const router = express.Router();

router.get("/", requestErrorHandler(getOhlcv));

export default router;
