import express from "express";

import { requestErrorHandler } from "../helpers/helper.js";
import { getCryptowatchConfigs } from "../controllers/configsController.js";

const router = express.Router();

router.get("/cryptowatch", requestErrorHandler(getCryptowatchConfigs));

export default router;
