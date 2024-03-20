const {setQuery, setQueryLastId} = require('../config/connect')

// Inscritpion d'un utilisateur dans la BBS + return LastId
exports.setRegister = (req, res) => {
    // Récupérer les données de la requête
    const { firsname, lastname, email, password,pseudo,number_road,address,postal_code,city } = req.body
    console.log(' req.body:',  req.body)

    // Requête SQL pour insérer un nouvel utilisateur
    const sql = 'INSERT INTO users (firsname, lastname, email, password,pseudo,number_road,address,postal_code,city,date_crea, last_log) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), NOW())'
    const values = [firsname, lastname, email, password,pseudo,number_road,address,postal_code,city]

    // Exécuter la requête SQL
    setQueryLastId(sql, values, res)
}

// Inscription d'un nouvel ami'
exports.setFriends = (req,res)=>{
    const {friend_id, user_id}=req.body
    const sql = 'INSERT INTO friends (friend_id, user_id, date_crea) VALUES (?, ?, NOW())'
    const values = [friend_id, user_id]
    setQuery(sql,values,res)
}