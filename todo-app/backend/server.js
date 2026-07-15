import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, "dist");

app.get('/api', (req, res) => {

})

app.post('/api', (req, res) => {

});

app.put('/api:', (req, res) => {

});

app.delete('/api:')

app.listen(3000, () => {
  console.log("Server is listening on Port 3000");
});