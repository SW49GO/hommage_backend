const express = require('express')
const router = express.Router()

const registerCtrl = require('../controllers/registration')


router.put('/register', registerCtrl.setRegister)
router.put('/addFriend', registerCtrl.setFriends)

module.exports = router