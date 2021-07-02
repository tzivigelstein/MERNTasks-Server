require('dotenv').config({ path: '.env' })
const { DATABASE: database, PORT, SECRET_CODE: secret } = process.env
const port = PORT || 4000

module.exports = {
  database,
  port,
  secret,
}
