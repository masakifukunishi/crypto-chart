import config from "config";
import { Request, Response } from "express";

import { CryptowatchConfig } from "../types/config";

export async function getCryptowatchConfigs(_req: Request, res: Response) {
  const cryptowatchConfig: CryptowatchConfig = config.get("cryptowatch");
  res.json(cryptowatchConfig);
}
