import express from "express";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server start: http://localhost:${port}`);
});
