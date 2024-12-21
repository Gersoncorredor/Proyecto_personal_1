const mysql = require("mysql2/promise")
require("dotenv").config()

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ger"
})

db.getConnection((err, connection) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err)
  } else {
    console.log("Conexión exitosa a la base de datos")
    connection.release()
  }
})
module.exports = db
