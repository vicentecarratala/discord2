const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();

const app = express();
const db = new sqlite3.Database('./plataforma.db');
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// Crear tablas si no existen
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    filename TEXT NOT NULL,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Registro
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, hash], function(err) {
    if (err) return res.status(400).send({ error: 'Usuario ya existe' });
    res.send({ message: 'Registrado correctamente' });
  });
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.send({ token });
  });
});

// Middleware para verificar token
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(403).send({ error: 'Token inválido' });
  }
}

// Subida de vídeos
app.post('/upload', auth, upload.single('video'), (req, res) => {
  const filename = req.file.filename;

  db.run(`INSERT INTO videos (user_id, filename) VALUES (?, ?)`, [req.userId, filename], function(err) {
    if (err) return res.status(500).send({ error: 'Error al guardar vídeo' });
    res.send({ message: 'Vídeo subido con éxito' });
  });
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));