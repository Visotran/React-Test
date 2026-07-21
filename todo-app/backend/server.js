import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

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

app.post('/api', async (req, res) => {
  
  const entry = req.body;

  try {

    // Bestehende JSON-Datei einlesen
    const currentData = await fs.readFile(jsonPath, "utf8");
    const currentEntries = JSON.parse(currentData);

    // Prüfen, ob der Body oder ein einzelnes Feld leer sind oder das Todo bereits existiert
    if (!entry || entry === {}) {
      return res.status(400).json({ error: "Der Todo-Eintrag darf nicht leer sein" });
    }
    if (!entry.name || entry.name.trim() === "" || !entry.deadline || entry.deadline.trim() === "") {
      return res.status(400).json({ error: "Alle Felder des neuen Todo-Eintrags müssen ausgefüllt sein" });
    }
    if (currentEntries.some(todo => todo.name === entry.name)) {
      return res.status(400).json({ error: "Es gibt bereits ein Todo-Eintrag mit diesem Namen" });
    }

    // Neuen Eintrag ins Array hinzufügen
    const newTodo = {
      id: Date.now(),
      name: entry.name,
      deadline: entry.deadline
    }
    currentEntries.push(newTodo);

    console.log("Neuer Eintrag hinzugefügt: " + entry.name);

    // Neue JSON-Datei schreiben
    await fs.writeFile(jsonPath, JSON.stringify(currentEntries));

    // Erfolgsmeldung
    res.status(201).json(newTodo);
  } catch (err) {

    // Fehlermeldung
    console.error(err);
    return res.status(500).json({ error: "Todo konnte nicht erstellt werden. Versuch es später erneut" });
  }
});

app.patch('/api', (req, res) => {

});

app.delete('/api', (req, res) => {

});

app.listen(3000, () => {
  console.log("Server is listening on Port 3000");
});