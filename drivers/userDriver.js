const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.newUser = async (req, res) => {
  //Revisar si hay errores
  const err = validationResult(req)
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() })
  }

  //Extraer email y password
  const { email, password } = req.body

  try {
    //Revisar que el user sea unico
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ msg: 'There is an user with those credentials' })
    }

    //Crea usuario
    user = new User(req.body)

    //Hash del password
    const salt = await bcryptjs.genSalt(10)
    user.password = await bcryptjs.hash(password, salt)

    //Guardar usuario
    await user.save()

    //Crear y firmar el JWT
    const payload = {
      user: {
        id: user.id,
      },
    }

    //Firmar el Token
    jwt.sign(
      payload,
      process.env.CODE,
      {
        expiresIn: 3600, // 1 Hora
      },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.log(err)
  }
}
