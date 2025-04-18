const mysql = require('mysql2/promise'); // ใช้ promise version

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',  // ใช้รหัสของคุณ
    database: 'Yok',           // ชื่อ database ของคุณ
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

module.exports = db;
