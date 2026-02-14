const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'eduardo',
    database: 'saboroso',
    password: 'Edu159.s.p',
    multipleStatements: true
  });

  module.exports = conn;