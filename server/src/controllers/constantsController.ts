import { Request, Response } from "express";

import { CHART_CONSTANT } from "../constants/chart.js";

export const getChartConstants = async (_req: Request, res: Response): Promise<void> => {
  res.json(CHART_CONSTANT);
};
