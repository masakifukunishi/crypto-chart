import config from "config";
import { Request, Response } from "express";

import { KrakenConfig } from "../types/config.js";

export const getKrakenConfigs = async (_req: Request, res: Response): Promise<void> => {
  const krakenConfig: KrakenConfig = config.get("kraken");
  res.json(krakenConfig);
};
