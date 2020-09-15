//Rutas para crear usuarios
const express = require('express')
const router = express.Router()
const userDriver = require('../drivers/userDriver')
const { check } = require('express-validator')

//Crear un user
//api/users
router.post('/',
    [
        check('name', 'We need an username').not().isEmpty(),
        check('email', 'We need an email').isEmail(),
        check('password', 'We need at least 6 characters').isLength({min: 6})
    ],
    userDriver.newUser
)

module.exports = router