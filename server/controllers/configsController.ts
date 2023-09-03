import config from "config";
import { Request, Response } from "express";

export async function getCryptowatchConfigs(req: Request, res: Response) {
  const cryptowatchConfig = config.get("cryptowatch");
  res.json(cryptowatchConfig);
}
