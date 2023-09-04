import { Request, Response } from "express";

import { CHART_CONSTANT } from "../constants/chart.js";

export async function getChartConstants(_req: Request, res: Response) {
  res.json(CHART_CONSTANT);
}
