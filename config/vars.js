require('dotenv').config()

const {
  NODE_ENV,
  DATABASE: database,
  PORT,
  SECRET_CODE: secret,
  PRODUCTION_FRONTEND_URL,
  DEVELOPMENT_FRONTEND_URL,
} = process.env

const enviroment = NODE_ENV || 'development'
const port = PORT || 4000
const frontendUrl = enviroment === 'production' ? PRODUCTION_FRONTEND_URL : DEVELOPMENT_FRONTEND_URL

console.log('Node enviroment', NODE_ENV)

module.exports = {
  database,
  port,
  secret,
  frontendUrl,
}
