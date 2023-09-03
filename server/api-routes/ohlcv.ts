import express from "express";
import { requestErrorHandler } from "../helpers/helper";
import { getOhlcv } from "../controllers/ohlcvController";

const router = express.Router();

router.get("/", requestErrorHandler(getOhlcv));

export default router;
