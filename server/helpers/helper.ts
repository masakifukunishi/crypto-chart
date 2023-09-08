import { Request, Response, NextFunction } from "express";

export const requestErrorHandler = (controller: (req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await controller(req, res);
      // Disable the explicit 'any' rule here because the error type is dynamic.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(err.stack);
    }
  };
};
