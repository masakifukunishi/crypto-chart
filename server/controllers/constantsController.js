import { CHART_CONSTANT } from "../constants/chart.js";

export async function getChartConstants(req, res) {
  res.json(CHART_CONSTANT);
}
