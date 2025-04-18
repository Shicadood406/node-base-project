// src/controller/userController.js
const db = require('../database/db');

exports.loginUsers = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ status: false, message: 'กรอกข้อมูลไม่ถูกต้อง' });
    }
  
    try {
      // 1. เช็คว่ามี user นี้ในระบบหรือไม่ (เช็คแค่ username ก่อน)
      const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  
      if (users.length === 0) {
        return res.status(404).json({ status: false, message: 'ไม่มีผู้ใช้นี้ในระบบ' });
      }
  
      const user = users[0];
  
      // 2. เช็ครหัสผ่านตรงหรือไม่
      if (user.password !== password) {
        return res.status(401).json({ status: false, message: 'รหัสผ่านไม่ถูกต้อง' });
      }
  
      // เข้าสู่ระบบสำเร็จ
      res.status(200).json({
        status: true,
        message: 'เข้าสู่ระบบสำเร็จ',
        user: {
          id: user.id,
          username: user.username,
          // ไม่ควรส่ง password ออกไป
        }
      });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
  };

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
  
