import { CHART_CONSTANT } from "../constants/chart";
import { Request, Response } from "express";

export async function getChartConstants(req: Request, res: Response) {
  res.json(CHART_CONSTANT);
}
