import config from "config";
import { Request, Response } from "express";

import { CryptowatchConfig } from "../types/config.js";

export const getCryptowatchConfigs = async (_req: Request, res: Response): Promise<void> => {
  const cryptowatchConfig: CryptowatchConfig = config.get("cryptowatch");
  res.json(cryptowatchConfig);
};
