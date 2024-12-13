const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/user.routes.js')
const connectDB = require('./db/db.js')


connectDB().catch((err) => {
  console.error('Database connection failed:', err.message)
  process.exit(1)
})

app.use(express.json()); // to parse JSON data in request bodies


app.use(cors())
app.use('/api/users',userRoutes)



  app.get('/',(req,res)=>{
    res.send('API is running...')
  })
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Internal Server Error' })
  })



module.exports = app;
