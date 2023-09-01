import { CHART_PRRIOD } from "../constants/chart.js";

export async function getChartConstants(req, res) {
  res.json({ CHART_PRRIOD: CHART_PRRIOD });
}
