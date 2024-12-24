const express = require('express')
const { requestPasswordReset, resetPassword} = require('../controllers/PaswordController')
const {enviar} = require('../controllers/PaswordController')

const router = express.Router()
/* 
router.post('/password-reset/request',requestPasswordReset)
router.post('/password-reset/reset',resetPassword)
*/
router.post('/password-reset/reset',enviar)

module.exports = router