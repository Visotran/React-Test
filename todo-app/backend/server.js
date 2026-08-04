import express from "express";
import cors from "cors";
import morgan from "morgan";
import pool from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// GET
app.get('/api', async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM todos ORDER BY id");
    res.json(data.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
})


// POST
app.post('/api', async (req, res) => {

  try {

    const entry = req.body;

    // Prüfen, ob der Body oder ein einzelnes Feld leer sind
    if (!entry || entry === {}) {
      return res.status(400).json({ error: "Der Todo-Eintrag darf nicht leer sein" });
    }
    if (!entry.name || entry.name.trim() === "" || !entry.deadline || entry.deadline.trim() === "") {
      return res.status(400).json({ error: "Alle Felder des neuen Todo-Eintrags müssen ausgefüllt sein" });
    }

    // Überprüfen, ob ein solcher Eintrag bereits existiert
    const query = await pool.query("SELECT * FROM todos WHERE name = $1", [entry.name]);
    if (!query.rowCount === 0) { 
      return res.status(400).json({ error: "Es gibt bereits ein Todo-Eintrag mit diesem Namen" });
    }

    // Neuen Eintrag zur Datenbank hinzufügen
    await pool.query(`INSERT INTO todos(name, deadline) VALUES ($1, $2)`, [entry.name, entry.deadline]);
    console.log("Neuer Eintrag hinzugefügt: " + entry.name);

    // Erfolgsmeldung
    const id = await pool.query("SELECT id FROM todos WHERE name = $1", [entry.name]);
    res.status(201).json({id: id, name: entry.name, deadline: entry.deadline});
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

    // Prüfen, ob das Element existiert, das gelöscht werden soll
    const query = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    if (!query.rowCount === 0) {
      return res.status(404).json({ error: "Der zu löschende Todo-Eintrag wurde nicht gefunden" });
    }

    // Das Element aus der Datenbank löschen
    await pool.query("DELETE FROM todos WHERE id = $1", [id])

    // Erfolgsmeldung
    res.status(201).json(id);
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

    // Prüfen, ob das Element existiert, das verändert werden soll
    const query = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    if (!query.rowCount === 0) {
      return res.status(404).json({ error: "Der zu bearbeitende Todo-Eintrag wurde nicht gefunden" });
    }

    // Prüfen, ob überhaupt Änderungen angegeben wurden
    if (!newName && !newDeadline) {
      return res.status(400).json({error: "Keine Änderung angegeben"});
    }

    // Prüfen, ob der angegebene neue Name gültig ist
    if (newName !== undefined) {
      if (typeof newName !== "string" || newName.trim() === "") {
        return res.status(400).json({error: "Der mitgeschickte neue Name ist ungültig"});
      }

      await pool.query("Update todos SET name = $1 WHERE id = $2", [newName, id]);
    }

    // Prüfen, ob die angegebene neue Deadline gültig ist
    if (newDeadline !== undefined) {
      if (typeof newDeadline !== "string" || newDeadline.trim() === "") {
        return res.status(400).json({error: "Die mitgeschickte neue Deadline ist ungültig"});
      }

      await pool.query("Update todos SET deadline = $1 WHERE id = $2", [newDeadline, id]);
    }

    // Erfolgsmeldung
    res.status(201).json({id: id, name: newName, deadline: newDeadline});
  } catch (err) {

    // Fehlermeldung
    console.error(err);
    return res.status(500).json({ error: "Todo konnte nicht erstellt werden. Versuche es später erneut" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on Port 3000");
});