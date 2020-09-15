//Rutas para autenticar usuarios
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authDriver = require('../drivers/authDriver')
const auth = require('../middlewares/auth')

//Autenticar un user
//api/auth
router.post('/',
    authDriver.authUser
)

router.get('/',
    auth,
    authDriver.authLog
)

module.exports = router