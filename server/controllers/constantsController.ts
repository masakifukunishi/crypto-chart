import { CHART_CONSTANT } from "../constants/chart";
import { Response } from "express";

export async function getChartConstants(res: Response) {
  res.json(CHART_CONSTANT);
}
