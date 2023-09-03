import OhlcvService from "../services/ohlcvService.js";
export async function getOhlcv(req, res) {
  const { period, currencyPair } = req.query;

  try {
    const ohlcvServiceInstance = new OhlcvService(currencyPair);
    const formattedChartData = await ohlcvServiceInstance.getChartData(period);
    res.json(formattedChartData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
