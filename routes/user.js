const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')

router.put('/signup', userCtrl.signup)
// router.post('/login', userCtrl.login)
router.get('/all',userCtrl.getAllUser)


module.exports = router