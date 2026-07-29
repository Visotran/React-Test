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


// GET
app.get('/api', async (req, res) => {
  try {
    const data = await fs.readFile(jsonPath, "utf8");
    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
})


// POST
app.post('/api', async (req, res) => {

  try {

    const entry = req.body;

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
    return res.status(500).json({ error: "Todo konnte nicht erstellt werden. Versuche es später erneut" });
  }
});


// DELETE
app.delete('/api/:id', async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    // Bestehende JSON-Datei einlesen
    const currentData = await fs.readFile(jsonPath, "utf8");
    const currentEntries = JSON.parse(currentData);

    const index = currentEntries.findIndex(item => item.id === id);
    const name = currentEntries[index];

    // Prüfen, ob das Element existiert, das gelöscht werden soll
    if ((!index && index !== 0) || index === -1) {
      return res.status(404).json({ error: "Der zu löschende Todo-Eintrag wurde nicht gefunden" });
    }

    // Eintrag aus dem Array entfernen
    console.log("Eintrag gelöscht: " + currentEntries[index].name);
    currentEntries.splice(index, 1);

    // Neue JSON-Datei schreiben
    await fs.writeFile(jsonPath, JSON.stringify(currentEntries));

    // Erfolgsmeldung
    res.status(201).json(name);
  } catch (err) {

    // Fehlermeldung
    console.error(err);
    return res.status(500).json({ error: "Todo konnte nicht gelöscht werden. Versuche es später erneut" });
  }
});


// PATCH
app.patch('/api/:id', async (req, res) => {

  const id = parseInt(req.params.id);
  const {newName, newDeadline} = req?.body ?? undefined;

  try {

    // Bestehende JSON-Datei einlesen
    const currentData = await fs.readFile(jsonPath, "utf8");
    const currentEntries = JSON.parse(currentData);

    const todo = currentEntries.find(todo => todo.id === id);

    // Prüfen, ob das Element existiert, das verändert werden soll
    if (!todo) {
      return res.status(404).json({ error: "Der zu bearbeitende Todo-Eintrag wurde nicht gefunden" });
    }

    // Prüfen, ob die mitgeschickten Werte gültig sind, und falls ja diese benutzen
    let newTodo = {id: id};

    if (!newName && !newDeadline) {
      return res.status(400).json({error: "Keine Änderung angegeben"});
    }

    if (newName !== undefined) {
      if (typeof newName !== "string" || newName.trim() === "") {
        return res.status(400).json({error: "Der mitgeschickte neue Name ist ungültig"});
      }

      todo.name = newName;
    }

    if (newDeadline !== undefined) {
      if (typeof newDeadline !== "string" || newDeadline.trim() === "") {
        return res.status(400).json({error: "Die mitgeschickte neue Deadline ist ungültig"});
      }

      todo.deadline = newDeadline;
    }

    console.log("Eintrag bearbeitet: " + todo.name + " - " + todo.deadline);

    // Neue JSON-Datei schreiben
    await fs.writeFile(jsonPath, JSON.stringify(currentEntries));

    // Erfolgsmeldung
    res.status(201).json(newTodo);
  } catch (err) {

    // Fehlermeldung
    console.error(err);
    return res.status(500).json({ error: "Todo konnte nicht erstellt werden. Versuche es später erneut" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on Port 3000");
});