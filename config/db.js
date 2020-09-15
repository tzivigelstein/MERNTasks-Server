const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('DB CONNECTED');
    } catch (error) {
        console.log('Hubo un error');
        process.exit(1)
    }
}

module.exports = connectDB