const {getQuery} = require('../config/connect')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.verifyAccount=(req,res)=>{
    const {email, password}= req.body
    const sql = 'SELECT id, lastname, firstname, pseudo, email, password, last_log FROM users WHERE email=?'
    getQuery(sql,[email],res)
    .then(result => {
        if (result.length > 0) {
            console.log(password)
            const user = result[0];
            console.log('user:', user.password)
            bcrypt.compare(password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' })
                }
                res.status(200).json({message:'correct'})
                })
            .catch(error => res.status(500).json({ error }))
        } else {
            console.log('Utilisateur non trouvé');
            res.status(404).json({ message: 'Utilisateur non trouvé' })
        }
    })
    .catch(err => {
        res.status(500).json({message:err})
    })
}