import express from "express";
import { requestErrorHandler } from "../helpers/helper";
import { getChartConstants } from "../controllers/constantsController";

const router = express.Router();

router.get("/chart", requestErrorHandler(getChartConstants));

export default router;
