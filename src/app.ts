import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running🔥",
    upTime: process.uptime() + " " + "sec",
    Date: new Date().toISOString(),
  });
});

export default app;
