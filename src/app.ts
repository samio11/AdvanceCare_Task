import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/GlobalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import { rootRoute } from "./app/routes";
const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", rootRoute);
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running🔥",
    upTime: process.uptime() + " " + "sec",
    Date: new Date().toISOString(),
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
