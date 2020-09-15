const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    //Leer el token del header
    const token = req.header('x-auth-token')

    //Revisar si no existe un token
    if (!token) {
        return res.status(401).json({ msg: 'There is no token, not permitted' })
    }

    //Validar el token
    try {
        const encoded = jwt.verify(token, process.env.CODE)
        req.user = encoded.user
        next()
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' })
    }
}