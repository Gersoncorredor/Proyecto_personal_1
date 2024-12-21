// backend/config.js
require('dotenv').config()

const config = {
  port: 3001,
  dbConnection: {
    host: process.env.DB_HOST, // Accede a las variables de entorno
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  key: {
    cryptoKey: process.env.CRYPTO_KEY, // Accede a la clave secreta para cifrado
  },
}

// Deberías ver el valor de CRYPTO_KEY

module.exports = config
