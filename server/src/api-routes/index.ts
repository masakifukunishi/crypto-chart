import express from "express";

import constantsRoutes from "./constants.js";
import configsRouters from "./configs.js";

const router = express.Router();

router.use("/constants", constantsRoutes);
router.use("/configs", configsRouters);

export default router;
