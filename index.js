const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const { port } = require('./config/vars')

//Crear server
const app = express()

//Conectar a la base de datos
connectDB()

//Habilitar CORS
app.use(cors())

//Habilitar express.json
app.use(express.json())

//Importar rutas
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))

//Iniciar el server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server deployed in port ${port}`)
})
