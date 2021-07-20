const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

const fiveHours = 3600 * 5

exports.newUser = async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(409).json({ msg: 'There is an user with those credentials' })
    }

    user = new User(req.body)

    const salt = await bcryptjs.genSalt(10)
    user.password = await bcryptjs.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id,
      },
    }

    const token = generateToken(payload, fiveHours)

    return res.status(201).json({ token })
  } catch (error) {
    console.log(error)
  }
}
