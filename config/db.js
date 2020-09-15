const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('DB CONNECTED');
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB