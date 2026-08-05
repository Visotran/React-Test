import express from "express";
import cors from "cors";
import morgan from "morgan";
import pool from "./db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
      return res.status(409).json({ error: "Es gibt bereits ein Todo-Eintrag mit diesem Namen" });
    }

    // Neuen Eintrag zur Datenbank hinzufügen
    await pool.query(`INSERT INTO todos(name, deadline, user_id) VALUES ($1, $2, 1)`, [entry.name, entry.deadline]);
    console.log("Neuer Eintrag hinzugefügt: " + entry.name);

    // Erfolgsmeldung
    const id = await pool.query("SELECT id FROM todos WHERE name = $1", [entry.name]);
    res.status(201).json({ id: id, name: entry.name, deadline: entry.deadline });
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
  const { newName, newDeadline } = req?.body ?? undefined;

  try {

    // Prüfen, ob das Element existiert, das verändert werden soll
    const query = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    if (!query.rowCount === 0) {
      return res.status(404).json({ error: "Der zu bearbeitende Todo-Eintrag wurde nicht gefunden" });
    }

    // Prüfen, ob überhaupt Änderungen angegeben wurden
    if (!newName && !newDeadline) {
      return res.status(400).json({ error: "Keine Änderung angegeben" });
    }

    // Prüfen, ob der angegebene neue Name gültig ist
    if (newName !== undefined) {
      if (typeof newName !== "string" || newName.trim() === "") {
        return res.status(400).json({ error: "Der mitgeschickte neue Name ist ungültig" });
      }

      await pool.query("Update todos SET name = $1 WHERE id = $2", [newName, id]);
    }

    // Prüfen, ob die angegebene neue Deadline gültig ist
    if (newDeadline !== undefined) {
      if (typeof newDeadline !== "string" || newDeadline.trim() === "") {
        return res.status(400).json({ error: "Die mitgeschickte neue Deadline ist ungültig" });
      }

      await pool.query("Update todos SET deadline = $1 WHERE id = $2", [newDeadline, id]);
    }

    // Erfolgsmeldung
    res.status(201).json({ id: id, name: newName, deadline: newDeadline });
  } catch (err) {

    // Fehlermeldung
    console.error(err);
    return res.status(500).json({ error: "Todo konnte nicht erstellt werden. Versuche es später erneut" });
  }
});


// User erstellen 
app.post('/api/register', async (req, res) => {
  try {

    const username = req.body.username.trim();
    const password = req.body.password;

    // Prüfen, ob der Body oder ein einzelnes Feld leer sind
    if (!req.body || req.body === {} || !username || username.trim() === "" || !password || password.trim() === "") {
      return res.status(400).json({ error: "Alle Felder müssen ausgefüllt sein" });
    }

    // Prüfen, ob der Username bereits existiert
    const query = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (!query.rowCount === 0) {
      return res.status(409).json({ error: "Dieser Name ist bereits vergeben" });
    }

    // Prüfen, ob der Username die richtige Länge besitzt
    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({ error: "Der Username muss zwischen 3 und 30 Zeichen lang sein" });
    }

    // Prüfen, ob das Passwort die richtige Länge besitzt
    if (password.length < 8 || password.length > 100) {
      return res.status(400).json({ error: "Das Passwort muss zwischen 8 und 100 Zeichen lang sein" });
    }

    // Passwort hashen
    const passwordHash = await bcrypt.hash(userPassword, 10);

    // Den Namen zur Datenbank hinzufügen
    await pool.query("INSERT INTO users(username, password) VALUES ($1, $2)", [username, passwordHash])

    // Erfolgsmeldung
    res.status(201).json(id);
  } catch (err) {

    // Fehlermeldung
    console.error(err);
    return res.status(500).json({ error: "Todo konnte nicht gelöscht werden. Versuche es später erneut" });
  }
});


// Login
app.post('/api/login', async (req, res) => {
  try {

    const username = req.body.username.trim();
    const password = req.body.password;

    // Prüfen, ob der Body oder ein einzelnes Feld leer sind
    if (!req.body || req.body === {} || !username || username.trim() === "" || !password || password.trim() === "") {
      return res.status(400).json({ error: "Alle Felder müssen ausgefüllt sein" });
    }

    // User abrufen
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (user.rowCount === 0) {
      return res.status(404).json({ error: "Der eingegebene Username existiert nicht" });
    }

    // Passwörter vergleichen
    if (!bcrypt.compare(password, user.rows.password_hash)) {
      return res.status(404).json({ error: "Username und Passwort stimmen nicht überein" });
    }

    // JWT generieren
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        userId: user.rows.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

    // Erfolgsmeldung
    res.status(201).json(token);
  } catch (err) {

    // Fehlermeldung
    console.error(err);
    return res.status(500).json({ error: "Todo konnte nicht gelöscht werden. Versuche es später erneut" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on Port 3000");
});