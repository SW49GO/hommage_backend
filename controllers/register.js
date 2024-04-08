const {setQuery, getQueryLastId} = require('../config/connect')
const fs = require('fs')
const bcrypt = require('bcrypt')


// Inscritpion d'un utilisateur dans la BBS + return LastId
exports.setRegister = (req, res) => {
 // Récupérer les données de la requête
    let { firstname, lastname, email, password,pseudo,number_road,address,postal_code,city } = req.body
    console.log(req.body)
    bcrypt.hash(password, 10, function(err, hash) {
        console.log('hash:', hash)
        const token = hash
         // Requête SQL pour insérer un nouvel utilisateur
        const sql = 'INSERT INTO users (firstname, lastname, email, password,pseudo,number_road,address,postal_code,city,date_crea, last_log) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), NOW())'
        const values = [firstname, lastname, email, token, pseudo,number_road,address,postal_code,city]
         // Exécuter la requête SQL
        getQueryLastId(sql, values, res)
        .then(result => { res.json({ result, token })})
        .catch(err => {
            res.status(500).json({message:err})
        })
    })
}

// Inscription d'un nouvel ami'
exports.setFriends = (req,res)=>{
    const {friend_id, user_id}=req.body
    const sql = 'INSERT INTO friends (friend_id, user_id, date_crea) VALUES (?, ?, NOW())'
    const values = [friend_id, user_id]
    setQuery(sql,values,res)
}

// Inscription d'un defunt + return LastId
exports.setDefunct = (req,res)=>{
    const {firstname, lastname, birthdate, death_date,cemetery,city_birth,city_death,postal_code,user_id,photo} = req.body
    const sql = 'INSERT INTO defuncts (firstname, lastname, birthdate, death_date,cemetery,city_birth,city_death,postal_code,user_id,photo,date_crea) VALUES (?,?,?,?,?,?,?,?,?,?,NOW())'
    const values = [firstname, lastname, birthdate, death_date,cemetery,city_birth,city_death,postal_code,user_id,photo]
    getQueryLastId(sql, values, res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Inscription d'un administrateur utilisateur de fiche défunt
exports.setUserAdmin = (req,res)=>{
    const {affinity,card_virtuel,card_real,new_user,user_id,defunct_id,flower} = req.body
    const sql = 'INSERT INTO user_admin (affinity,card_virtuel,card_real,new_user,user_id,defunct_id,flower,date_crea) VALUES (?,?,?,?,?,?,?,NOW())'
    const values = [affinity,card_virtuel,card_real,new_user,user_id,defunct_id,flower]
    setQuery(sql,values,res)
}

// Enregistrement d'un message envoyé via formulaire de contact
exports.setContact = (req,res)=>{
    const {lastname,email,message,user_id} = req.body
    const sql = 'INSERT INTO contact (lastname,email,message,user_id,date_crea) VALUES (?,?,?,?,NOW())'
    const values = [lastname,email,message,user_id]
    setQuery(sql,values,res)
}

// Enregistrement d'un photo de defunt
exports.setPhotoDef = (req,res)=>{
    const {user_id,defunct_id,name} = req.body
    const sql = 'INSERT INTO photos (user_id,defunct_id,name,date_crea) VALUES (?,?,?,NOW())'
    const values = [user_id,defunct_id,name]
    getQueryLastId(sql, values, res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Enregistrement d'un commentaire
exports.setComment = (req,res) =>{
    const {comment,user_id,defunct_id,photo_id} = req.body
    const sql = 'INSERT INTO comments (comment,user_id,defunct_id,photo_id,date_crea) VALUES (?,?,?,NOW())'
    const values = [comment,user_id,defunct_id,photo_id]
    getQueryLastId(sql, values, res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}
//Enregistrement du contenu d'une carte
exports.setContent = (req,res) =>{
    const {content,user_id,card_id} = req.body
    const sql = 'INSERT INTO content_card (content,user_id,card_id,date,crea) VALUES (?,?,?,NOW())'
    const values = [content,user_id,card_id]
    getQueryLastId(sql, values, res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Enregistrement des cartes achetées
exports.setOrders = (req,res) =>{
    const {user_id,lastname,firstname,lastname_send,email,cards_id,flowers_id,total,user_send_id,tel} = req.body
    const sql = 'INSERT INTO orders (user_id,lastname,firstname,lastname_send,email,cards_id,flowers_id,total,user_send_id,tel,date_crea) VALUES (?,?,?,?,?,?,?,?,?,NOW())'
    const values = [user_id,lastname,firstname,lastname_send,email,cards_id,flowers_id,total,user_send_id,tel]
    getQueryLastId(sql, values, res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Enregistrement des messages du chat
exports.setTchat = (req,res) =>{
    const {user_id,friend_id,content} = req.body
    const sql = 'INSERT INTO tchat (user_id,friend_id,content,date_crea) VALUES (?,?,?,NOW())'
    const values = [user_id,friend_id,content]
    setQuery(sql,values,res)
}
