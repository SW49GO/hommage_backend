const express = require('express')
const router = express.Router()

const registerCtrl = require('../controllers/register')
const updaterCtrl = require('../controllers/updater')
const deleterCtrl = require('../controllers/deleter')
const getInfosCtrl = require('../controllers/getInfos')
const globalCtrl = require('../controllers/globalRequest')

const multer = require('../middlewares/multer-config')

const auth = require('../middlewares/auth')

/**
 * Function to select and execute the right controller for each routes
 * @param {object} ctrlObj 
 * @returns response BDD
 */
function executeController(ctrlObj) {
    return function(req, res) {
        const { controller } = req.params
        const params = req.body
        const chosenController = ctrlObj[controller]

        if (!chosenController || typeof chosenController !== 'function') {
            return res.status(400).json({ message: 'Contrôleur invalide' })
        }
        chosenController(req, res, params)
    }
}

router.put('/register/:controller', auth, executeController(registerCtrl))

router.post('/registerFile',auth,  multer, (req,res)=>{
    console.log('body',req.body)
    if (req.file) {
        console.log('File uploaded:', req.file.filename)
    } else {
        console.log('No file uploaded')
    }
    res.sendStatus(200)
})

router.post('/updater/:controller', auth, executeController(updaterCtrl))
router.post('/deleter/:controller', auth, executeController(deleterCtrl))
router.post('/getInfos/:controller', auth, executeController(getInfosCtrl))
router.post('/signIn/:controller', executeController(registerCtrl))
router.post('/connect/:controller',executeController(globalCtrl))

module.exports = router