const jwt = require('jsonwebtoken')
const { secret } = require('../config/vars')

const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn })
}

module.exports = generateToken
