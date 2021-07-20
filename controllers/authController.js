const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const generateToken = require('../helpers/generateToken')
const fiveHours = 3600 * 5

exports.authUser = async (req, res) => {
  //Revisar si hay errores
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() })
  }

  //Extraer email y password
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials. Please try again.' })
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: 'Invalid credentials. Please try again.' })
    }

    const payload = {
      user: {
        id: user.id,
      },
    }

    const token = generateToken(payload, fiveHours)

    return res.status(202).json({ token })
  } catch (error) {
    console.log(error)
    res.status(400).json({ msg: 'There was an error' })
  }
}

exports.authLog = async ({ user: { id } }, res) => {
  try {
    const user = await User.findById(id).select('-password')
    res.status(202).json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'There was an error' })
  }
}
