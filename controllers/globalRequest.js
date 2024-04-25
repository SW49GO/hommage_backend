const {getQuery, setQuery, handleResponse} = require('../config/connect')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

exports.verifyAccount=(req,res)=>{
    const {email, password}= req.body
    // console.log('req.body:', req.body)
    const sql = 'SELECT id, lastname, firstname, pseudo, email, password, last_log FROM users WHERE email=?'
    getQuery(sql,[email],res)
    .then(result => {
        // console.log('result:', result)
        if (result.length > 0) {
            const user = result[0]
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
            console.log('Utilisateur non trouvé')
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

exports.transferAccountFile = (req,res)=>{
    const {id, new_user, data} =req.body
    console.log('TRANSFER',req.body)

    data.forEach(defunct_id => {
        // Verify folder of defunct
        const folderPath = `./images/photos/${defunct_id}`
        fs.access(folderPath, fs.constants.F_OK, (err) => {
            fs.readdir(folderPath, (err, files) => {
                // Verify if new_user has already files on this defunct
                const newAdminFiles = files.filter(file => file.startsWith(`${parseInt(new_user)}-`))
                const exAdminFiles = files.filter(file => file.startsWith(`${parseInt(id)}-`))
                if(newAdminFiles.length===0){
                    exAdminFiles.forEach(file => {
                        const newName = file.replace(`${parseInt(id)}-`, `${parseInt(new_user)}-`)
                        fs.rename(`${folderPath}/${file}`, `${folderPath}/${newName}`, (err) => {
                            if (err) {
                                console.error('Erreur lors du remplacement du fichier:', err)
                            } else {
                                console.log(`Le fichier ${file} a été remplacé par ${newName}`)
                            }
                        })
                    })
                }else{
                    const indexFiles = parseInt(newAdminFiles.length)
                    exAdminFiles.forEach(file=>{
                        indexFiles++
                        const newName = `${parseInt(new_user)}-${indexFiles}.${file.split('.')[1]}`                        
                        fs.rename(`${folderPath}/${file}`, `${folderPath}/${newName}`, (err) => {
                            if (err) {
                                console.error('Erreur lors du remplacement du fichier:', err)
                            } else {
                                console.log(`Le fichier ${file} a été remplacé par ${newName}`)
                            }
                        })
                    })
                }
            })
        }) 
    })
}

exports.changeAdminDefunct= (req,res)=>{
    const {id, new_user, defunct_id} =req.body
    const sql = 'UPDATE user_admin SET user_id=? WHERE user_id=? AND defunct_id=?'
    const values = [new_user,id,defunct_id]
   setQuery(sql, values,res)
}
exports.changeDefunctOwner = (req,res)=>{
    const {id, new_user, defunct_id} =req.body
    const sql1 = 'UPDATE defuncts SET user_id=? WHERE user_id=? && id=?'
    const values1 = [new_user, id, defunct_id]
    setQuery(sql1, values1,res)
}