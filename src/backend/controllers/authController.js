const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const config = require('../config/config');


const maxAttempst = 5 ;
const lockTime = 10 * 60 * 1000;

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
  }

  try {
    const [users] = await db.execute('SELECT * FROM users WHERE email = ? ', [email]);

    if (users.length === 0 ) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const user = users[0];

    if (user.lockUntil && new Date( user.lockUntil > new Date())){
    return res.status(400).json({ message:'Cuenta bloqueada, Intente mas tarde.'})
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){

      const failed_Attempts = user.failedAttempts + 1

      if (failed_Attempts >= maxAttempst){
     
          const lock_until = new Date( Date.now() + lockTime)

          await db.execute('update users set failedAttempts = ?, lockUntil = ? where email = ?',[failed_Attempts,lock_until,email])
        return res.status(400).jso({ message: 'Cuenta bloqueada, Intente mas tarde.'})
      }
      await db.execute('update users set failedAttempts = ? where email = ?',[failed_Attempts,email])

      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }
    await db.execute('update users set failedAttempts = ? where email = ?',[ 0 ,email])
    const token = jwt.sign({ userId: user.id }, config.key.cryptoKey, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { Login };
