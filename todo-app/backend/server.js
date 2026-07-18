import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import cors from "cors";

const app = express();

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, "data", "todos.json");

app.get('/api', async (req, res) => {
  try {
    const data = await fs.readFile(jsonPath, "utf8");
    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
})

app.post('/api', (req, res) => {

});

app.patch('/api', (req, res) => {

});

app.delete('/api', (req, res) => {

});

app.listen(3000, () => {
  console.log("Server is listening on Port 3000");
});