const express = require('express')
const path = require('path')
const userRoutes = require('./routes/user')
// const multer = require('multer')
const app = express()

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
// app.use(multer)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
  })
// app.options('api/user/registerFile', (req, res) => {
//   res.status(200).end()
// })

app.use('/api/user', userRoutes)
app.use('/api/user', express.static(path.join(__dirname,'images')))
app.use('/images', express.static('./images'))


module.exports = app