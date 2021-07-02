const mongoose = require('mongoose')
const { database } = require('./vars')

const connectDB = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.log('SUCCESS: Database connected successfuly')
  } catch (error) {
    console.log("ERROR: Couldn't connect to database")
    process.exit(1)
  }
}

module.exports = connectDB
