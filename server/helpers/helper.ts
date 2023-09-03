import { Request, Response, NextFunction } from "express";

export function requestErrorHandler(controller: (req: Request, res: Response) => Promise<void>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      return await controller(req, res);
    } catch (err: any) {
      next(err.stack);
    }
  };
}
