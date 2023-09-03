import path from "path";
import express, { Express, Request, Response, NextFunction } from "express";
import apiRoutes from "./api-routes/index";
import "./helpers/db.js";

const app: Express = express();
const port: number = Number(process.env.PORT) || 8080;

app.use(express.static("dist"));

app.use(express.json());

app.use("/api", apiRoutes);

app.get("*", (req: Request, res: Response) => {
  const pathIndex: string = path.resolve("dist", "index.html");
  res.sendFile(pathIndex);
});

app.use(function (req: Request, res: Response) {
  res.status(404).send("Page Not Found");
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ msg: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server start: http://localhost:${port}`);
});