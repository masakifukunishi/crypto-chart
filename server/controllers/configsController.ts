import config from "config";
import { Response } from "express";

export async function getCryptowatchConfigs(res: Response) {
  const cryptowatchConfig = config.get("cryptowatch");
  res.json(cryptowatchConfig);
}
