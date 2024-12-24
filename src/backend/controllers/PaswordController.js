const { Resend } = require('resend')
const config = require('../config/config')

const enviar = async (req, res) => {
  const resend = new Resend(config.key.resendKey)

  resend.emails.send({
    from: 'jp1838883@gmail.com',
    to: 'jp1838883@gmail.com',
    subject: 'primer intento',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
  })
}

module.exports = {enviar}