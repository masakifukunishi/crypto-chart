import path from "path";
import express from "express";
import apiRoutes from "./api-routes/index.js";
import "./helpers/db.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("dist"));

app.use(express.json());

app.use("/api", apiRoutes);

app.get("/test", (req, res) => {
  res.json({ msg: "Hello from server!" });
  console.log("test");
});

app.get("*", (req, res) => {
  const pathIndex = path.resolve("dist", "index.html");
  res.sendFile(pathIndex);
});

app.use(function (req, res) {
  res.status(404).send("Page Not Found");
});

app.use(function (err, req, res, next) {
  res.status(500).json({ msg: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server start: http://localhost:${port}`);
});
