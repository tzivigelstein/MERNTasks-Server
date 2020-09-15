const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUser = async (req, res) => {

    //Revisar si hay errores
    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() })
    }

    //Extraer email y password
    const { email, password } = req.body

    try {

        //Revisar que es un user registrado
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'User doesnt exist' })
        }

        //Revisar el password
        const correctPass = await bcryptjs.compare(password, user.password)
        if (!correctPass) {
            return res.status(400).json({ msg: 'Incorrect password' })
        }

        //Crear y firmar el JWT
        const payload = {
            user: {
                id: user.id
            }
        }

        //Firmar el Token
        jwt.sign(payload, process.env.CODE, {
            expiresIn: 3600 // 1 Hora
        }, (err, token) => {
            if (err) throw err
            res.json({ token })
        })

    } catch (err) {
        console.log(err);
        res.status(400).send('There was an error')
    }
}

exports.authLog = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({ user })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'There was an error' })
    }
}