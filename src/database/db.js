// src/database/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'my-secret-pw',       // ใส่รหัสผ่าน MySQL ของคุณ
  database: 'Yok'  // ใช้ชื่อ database ที่คุณสร้างไว้
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;
