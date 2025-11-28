import { Request, Response, NextFunction } from "express";

const configErrors = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): any => {
  if (error instanceof Error) {
    return response.status(400).json({
      error: error.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};

export { configErrors };
