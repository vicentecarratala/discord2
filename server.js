const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Base de datos SQLite
const db = new sqlite3.Database("database.db");

// Crear tabla si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Registro
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, password],
    function (err) {
      if (err) {
        return res.status(400).json({ message: "Usuario ya existe." });
      }
      res.json({ message: "Registro exitoso." });
    }
  );
});

// Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err) return res.status(500).json({ message: "Error interno." });
      if (row) {
        res.json({ message: "Login exitoso." });
      } else {
        res.status(401).json({ message: "Credenciales incorrectas." });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});