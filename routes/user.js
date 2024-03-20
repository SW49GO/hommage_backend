const express = require('express')
const router = express.Router()

const registerCtrl = require('../controllers/register')

router.put('/register/:controller', (req, res) => {
    const { controller } = req.params
    const params = req.body

    // Vérifie si le contrôleur existe
    const chosenController = registerCtrl[controller];
    if (!chosenController || typeof chosenController !== 'function') {
        return res.status(400).json({ message: 'Contrôleur invalide' });
    }

    // Appel le contrôleur 
    chosenController(req, res, params)
})

module.exports = router