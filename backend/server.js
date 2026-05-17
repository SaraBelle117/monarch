require('dotenv').config();
const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../frontend/public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../frontend/public/uploads')));

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

/* AUTH */

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (rows.length > 0) {
      const user = rows[0];
      res.json({ success: true, role: user.role, user: { id: user.id, name: user.username, email: user.email } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/auth/signup', async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  try {
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }
    const [result] = await db.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, 'student']
    );
    res.json({ success: true, message: 'User registered successfully', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

/* USERS */

app.get('/api/users/:id', async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT id, username, email, role, bio, picture, createdAt FROM users WHERE id = ?',
      [req.params.id]
    );
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { username, bio, picture } = req.body;
  try {
    await db.query(
      'UPDATE users SET username = ?, bio = ?, picture = ? WHERE id = ?',
      [username, bio, picture, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ success: true, url: `http://localhost:${PORT}/uploads/${req.file.filename}` });
});

/* INSTRUMENTS */

app.get('/api/instruments', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM instruments ORDER BY name');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* LESSONS */

app.get('/api/users/:id/lessons', async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT l.*, u.username as teacherName 
       FROM lessons l
       LEFT JOIN users u ON l.teacherId = u.id
       WHERE l.studentId = ?
       ORDER BY l.scheduledAt DESC`,
      [req.params.id]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* LESSON REQUESTS */

app.get('/api/users/:id/lesson-requests', async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT * FROM lesson_requests WHERE studentId = ? ORDER BY createdAt DESC',
      [req.params.id]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/lesson-requests', async (req, res) => {
  const { studentId, instrument, campus, preferredTime, reason } = req.body;
  if (!studentId || !instrument || !campus) {
    return res.status(400).json({ message: 'Student, instrument, and campus are required' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO lesson_requests (studentId, instrument, campus, preferredTime, reason) VALUES (?, ?, ?, ?, ?)',
      [studentId, instrument, campus, preferredTime || null, reason || null]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* START */

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));

process.on('uncaughtException', (err) => console.error('Uncaught Exception:', err));
process.on('unhandledRejection', (err) => console.error('Unhandled Rejection:', err));