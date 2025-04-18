// src/controller/userController.js
const db = require('../database/db');

// POST: ดึงผู้ใช้ทั้งหมด
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// POST: ดึงผู้ใช้ตาม ID (จาก req.body)
exports.getUserById = (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'Missing user ID' });

  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(results[0]);
  });
};
