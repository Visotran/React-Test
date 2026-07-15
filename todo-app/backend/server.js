import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, "dist");

app.use(express.static(clientPath));

app.use((req, res) => {
  res.sendFile(path.resolve(clientPath, "index.html"));
});

app.listen(3000, () => {
  console.log("Server is listening on Port 3000");
});