import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  data: T | T[] | null;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: true,
    message: data?.message,
    data: data?.data,
  });
};
