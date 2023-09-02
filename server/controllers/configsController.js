import config from "config";

export async function getCryptowatchConfigs(req, res) {
  const cryptowatchConfig = config.get("cryptowatch");
  res.json(cryptowatchConfig);
}
