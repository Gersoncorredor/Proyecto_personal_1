const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
const db = require('./config/db');

const authRoutes = require('./routes/authRoute');
const passwordRoutes = require('./routes/passwordRoutes');

app.use('/api', authRoutes);
app.use('/api', passwordRoutes);

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
