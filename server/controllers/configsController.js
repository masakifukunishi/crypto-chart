import config from "config";

export async function getCryptowatchConfigs(req, res) {
  const cryptoWatchConfig = config.get("cryptowatch");
  res.json(cryptoWatchConfig);
}
