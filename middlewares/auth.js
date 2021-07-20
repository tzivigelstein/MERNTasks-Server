const jwt = require('jsonwebtoken')
const { secret } = require('../config/vars')

module.exports = function (req, res, next) {
  //Leer el token del header
  const token = req.header('x-auth-token')

  //Revisar si no existe un token
  if (!token) {
    return res.status(401).json({ msg: 'Missing or invalid token' })
  }

  //Validar el token
  try {
    const encoded = jwt.verify(token, secret)
    req.user = encoded.user
    next()
  } catch (error) {
    res.status(401).json({ msg: 'Missing or invalid token' })
  }
}
