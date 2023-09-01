import Ohlcv from "../models/ohlcv.js";
import OhlcvService from "../services/ohlcvService.js";
export async function getOhlcv(req, res) {
  const period = req.query.chartPeriod;

  try {
    const ohlcvServiceInstance = new OhlcvService();
    const formattedChartData = await ohlcvServiceInstance.getChartData(period);
    res.json(formattedChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
