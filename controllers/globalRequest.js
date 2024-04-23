const {getQuery, setQuery} = require('../config/connect')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.verifyAccount=(req,res)=>{
    const {email, password}= req.body
    // console.log('req.body:', req.body)
    const sql = 'SELECT id, lastname, firstname, pseudo, email, password, last_log FROM users WHERE email=?'
    getQuery(sql,[email],res)
    .then(result => {
        // console.log('result:', result)
        if (result.length > 0) {
            const user = result[0];
            bcrypt.compare(password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' })
                }
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        'test',
                        { expiresIn: '24h' }
                    )
                })
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

exports.verifyEmail=(req,res)=>{
    const {email} =req.body
    const sql = 'SELECT id, password FROM users WHERE email=?'
    getQuery(sql,[email],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}
exports.changePass = (req, res)=>{
    console.log('UPDATEPASS')
    const {id, password} =req.body
    console.log('req.body:', req.body)
    bcrypt.hash(password, 10, function(err, hash) {
        const password = hash
        const sql = 'UPDATE users SET password=? WHERE id=?'
        const values = [password, id]
        setQuery(sql,values,res)
    })
}