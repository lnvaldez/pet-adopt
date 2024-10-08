const mysql = require("mysql2/promise");
const config = require("../config/config");

const dbData = config.database;

const db = mysql.createConnection({
  host: dbData.host,
  user: dbData.user,
  password: dbData.password,
  database: dbData.database,
});