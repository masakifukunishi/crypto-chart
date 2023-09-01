import express from "express";
import { requestErrorHandler } from "../helpers/helper.js";
import { getChartConstants } from "../controllers/constantsController.js";

const router = express.Router();

router.get("/chart", requestErrorHandler(getChartConstants));

export default router;
