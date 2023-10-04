import express from "express";

import { requestErrorHandler } from "../helpers/helper.js";
import { getKrakenConfigs } from "../controllers/configsController.js";

const router = express.Router();

router.get("/kraken", requestErrorHandler(getKrakenConfigs));

export default router;
