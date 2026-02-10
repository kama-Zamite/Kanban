// Criação de tabela de colunas (executa só uma vez)
db.run(`CREATE TABLE IF NOT EXISTS columns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  name TEXT,
  key TEXT,
  FOREIGN KEY(userId) REFERENCES users(id)
)`);

// Listar colunas do usuário
router.get('/columns/:userId', (req, res) => {
  db.all('SELECT * FROM columns WHERE userId = ?', [req.params.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar colunas' });
    res.json(rows);
  });
});

// Criar coluna
router.post('/columns', (req, res) => {
  const { userId, name, key } = req.body;
  db.run(
    'INSERT INTO columns (userId, name, key) VALUES (?, ?, ?)',
    [userId, name, key],
    function (err) {
      if (err) return res.status(400).json({ error: 'Erro ao criar coluna' });
      res.json({ id: this.lastID, userId, name, key });
    }
  );
});

// Atualizar coluna
router.put('/columns/:id', (req, res) => {
  const { name, key } = req.body;
  db.run(
    'UPDATE columns SET name = ?, key = ? WHERE id = ?',
    [name, key, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: 'Erro ao atualizar coluna' });
      res.json({ updated: this.changes });
    }
  );
});

// Deletar coluna
router.delete('/columns/:id', (req, res) => {
  db.run('DELETE FROM columns WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: 'Erro ao deletar coluna' });
    res.json({ deleted: this.changes });
  });
});
import express from 'express';
import sqlite3 from 'sqlite3';

const router = express.Router();
const db = new sqlite3.Database('./database.sqlite');

// Criação de tabela de tarefas (executa só uma vez)
db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  title TEXT,
  description TEXT,
  done INTEGER DEFAULT 0,
  column TEXT DEFAULT 'backlog',
  FOREIGN KEY(userId) REFERENCES users(id)
)`);

// Listar tarefas do usuário
router.get('/:userId', (req, res) => {
  db.all('SELECT * FROM tasks WHERE userId = ?', [req.params.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar tarefas' });
    res.json(rows);
  });
});

// Criar tarefa
router.post('/', (req, res) => {
  const { userId, title, description, column } = req.body;
  db.run(
    'INSERT INTO tasks (userId, title, description, column) VALUES (?, ?, ?, ?)',
    [userId, title, description, column || 'backlog'],
    function (err) {
      if (err) return res.status(400).json({ error: 'Erro ao criar tarefa' });
      res.json({ id: this.lastID, userId, title, description, done: 0, column: column || 'backlog' });
    }
  );
});

// Atualizar tarefa
router.put('/:id', (req, res) => {
  const { title, description, done, column } = req.body;
  db.run(
    'UPDATE tasks SET title = ?, description = ?, done = ?, column = ? WHERE id = ?',
    [title, description, done, column, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: 'Erro ao atualizar tarefa' });
      res.json({ updated: this.changes });
    }
  );
});

// Deletar tarefa
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM tasks WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: 'Erro ao deletar tarefa' });
    res.json({ deleted: this.changes });
  });
});

export default router;
