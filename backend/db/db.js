const handleError = require('../utils/asyncHandler')

const mongoose = require('mongoose')
const { DB_NAME } = require('../constants.js')

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, {
        });
    console.log(`\nMongoDB Connected: ${connectionInstance.connection.host}`)
  } catch (err) {
    handleError(err)
  }
}

module.exports = connectDB
