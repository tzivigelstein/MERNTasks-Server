const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const { port, frontendUrl } = require('./config/vars')

//Crear server
const app = express()

console.log(frontendUrl)

//Conectar a la base de datos
connectDB()

const config = {
  origin: frontendUrl,
}

console.log({ origin: frontendUrl })

//Enable CORS
app.use(cors(config))

//Enable JSON parsing
app.use(express.json())

//Import routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))

//Iniciar el server
app.listen(port, () => {
  console.log(`Server deployed in port ${port}`)
})
