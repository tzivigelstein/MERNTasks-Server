const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/vars')

exports.authUser = async (req, res) => {
  //Revisar si hay errores
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() })
  }

  //Extraer email y password
  const { email, password } = req.body

  try {
    //Revisar que es un user registrado
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist" })
    }

    //Revisar el password
    const correctPass = await bcryptjs.compare(password, user.password)
    if (!correctPass) {
      return res.status(400).json({ msg: 'Incorrect password' })
    }

    //Crear y firmar el JWT
    const payload = {
      user: {
        id: user.id,
      },
    }

    //Firmar el Token
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: 3600, // 1 Hora
      },
      (error, token) => {
        if (error) throw error
        res.json({ token })
      }
    )
  } catch (error) {
    console.log(error)
    res.status(400).send('There was an error')
  }
}

exports.authLog = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'There was an error' })
  }
}
