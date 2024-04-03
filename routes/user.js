const express = require('express')
const router = express.Router()

const registerCtrl = require('../controllers/register')
const updaterCtrl = require('../controllers/updater')
const deleterCtrl = require('../controllers/deleter')
const getInfosCtrl = require('../controllers/getInfos')

const upload = require('../middlewares/multer-config')

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

router.put('/register/:controller', executeController(registerCtrl))
router.post('/registerFile', upload, (req,res)=>{
    if (req.file) {
        console.log('File uploaded:', req.file.filename)
    } else {
        console.log('No file uploaded')
    }
    res.sendStatus(200)
})

router.post('/updater/:controller', executeController(updaterCtrl))
router.post('/deleter/:controller', executeController(deleterCtrl))
router.post('/getInfos/:controller', executeController(getInfosCtrl))

module.exports = router