const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const { port, frontendUrl } = require('./config/vars')

//Crear server
const app = express()

//Conectar a la base de datos
connectDB()

//Enable CORS
app.use(cors({ origin: '*' }))

//Enable JSON parsing
app.use(express.json())

//Import routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))

//Init server
app.listen(port, () => {
  console.log(`Server deployed in port ${port}`)
})
