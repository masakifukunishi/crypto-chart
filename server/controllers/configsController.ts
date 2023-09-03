import config from "config";
import { Request, Response } from "express";

export async function getCryptowatchConfigs(_req: Request, res: Response) {
  const cryptowatchConfig = config.get("cryptowatch");
  res.json(cryptowatchConfig);
}
