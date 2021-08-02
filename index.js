const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const { port, frontendUrl } = require('./config/vars')
const { networkInterfaces } = require('os')

const nets = networkInterfaces()
const results = {}

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    if (net.family === 'IPv4' && !net.internal) {
      if (!results[name]) {
        results[name] = []
      }
      results[name].push(net.address)
    }
  }
}

const localIp = results['Wi-Fi'][0]

//Crear server
const app = express()

//Conectar a la base de datos
connectDB()

//Enable CORS
app.use(cors({ origin: frontendUrl }))

//Enable JSON parsing
app.use(express.json())

//Import routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))

//Init server
app.listen(port, () => {
  console.log(`Server deployed in http://${localIp}:${port}`)
})
