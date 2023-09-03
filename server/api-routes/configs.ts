import express from "express";
import { requestErrorHandler } from "../helpers/helper";
import { getCryptowatchConfigs } from "../controllers/configsController";

const router = express.Router();

router.get("/cryptowatch", requestErrorHandler(getCryptowatchConfigs));

export default router;
