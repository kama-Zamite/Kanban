import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';
import tasksRouter from './tasks.js';

const app = express();
const db = new sqlite3.Database('./database.sqlite');

app.use(cors());
app.use(bodyParser.json());

// Criação de tabela de usuários
// (executa apenas uma vez, depois pode comentar)
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT
)`);

// Rota de cadastro
app.post('/cadastro', (req, res) => {
  const { name, email, password } = req.body;
  db.run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    function (err) {
      if (err) return res.status(400).json({ error: 'Email já cadastrado' });
      res.json({ id: this.lastID, name, email });
    }
  );
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, user) => {
      if (err || !user) return res.status(401).json({ error: 'Credenciais inválidas' });
      res.json({ id: user.id, name: user.name, email: user.email });
    }
  );
});


// Rotas de tarefas
app.use('/tasks', tasksRouter);

app.listen(3001, () => {
  console.log('Backend rodando em http://localhost:3001');
});
