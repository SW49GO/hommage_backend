const express = require('express')
const path = require('path')
const userRoutes = require('./routes/user')
const app = express()

app.use(express.json()) 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
  })
app.use('/api/user', userRoutes)
app.use('/images', userRoutes)
app.use('/images', express.static(path.join(__dirname,'images')))
app.options('/images/registerFile', (req, res) => {
  res.status(200).end()
})

module.exports = app