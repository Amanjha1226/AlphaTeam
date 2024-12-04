const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./db/db.js')
connectDB()

app.use(cors())

  app.get('/',(req,res)=>{
    res.send('API is running...')
  })



app.listen(5000, () => console.log('Server running on port 5000'));

module.exports = app;
