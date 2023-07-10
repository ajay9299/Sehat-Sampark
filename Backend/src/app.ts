import morgan from "morgan";
import express, { Application, NextFunction, Request, Response } from "express";
import { incomingRequestLoggerMiddleware } from "./middlewares";
import applicationRoute from "./routes";
import cors from "cors";

const app: Application = express();
interface Error {
  details?: any;
}
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

/** Body parse middleware. */
app.use(express.json());
/** Outgoing request logger middleware. */
app.use(morgan("dev"));
/** Incoming request logger middleware. */
app.use(incomingRequestLoggerMiddleware);
app.use(cors({ origin: "*" }));
app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ ok: "ok", message: "Server is running 🚀🚀🚀" });
});

/** This route handle available routes inside the auth service. */
app.use("/v1", applicationRoute);

/**Handle invalid route */
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "Sorry this route not present on server" });
});

/**Handle global errors */
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.details) {
    const validationErrors: string[] = [];

    error.details.forEach((error: any) => {
      validationErrors.push(error.message);
    });

    return res
      .status(400)
      .json({ error: "Validation error", details: validationErrors });
  }
  return res.status(500).json({ error });
});

export default app;
