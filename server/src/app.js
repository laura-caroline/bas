const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const path = require('path')

require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))


app.listen(process.env.APP_PORT, ()=>{
  console.log('Server is running in port', process.env.APP_PORT)
})