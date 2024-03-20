const mysql = require('mysql');
const { connect } = require('../routes/user');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hommage'
})

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err)
        return;
    }
    console.log('Connecté à la base de données MySQL.')
})
// Fonction générique pour exécuter une requête SQL
function executeQuery(sql, values, callback) {
    connection.query(sql, values, callback)
}

// Fonction générique pour gérer la réponse
function handleResponse(res, status, message) {
    return res.status(status).json({ message })
}

// Fonction générique pour exécuter une requête et renvoyer le résultat
function setQueryLastId(sql, values, res) {
    // Exécuter la requête SQL
    executeQuery(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SQL :', err)
            return handleResponse(res, 500, 'Erreur serveur')
        }
        console.log('Succès')
        // Récupérer le lastId
        const lastId = result.insertId;
        return handleResponse(res, 200, { userId: lastId })
    })
}

function setQuery(sql, values, res) {
    // Exécuter la requête SQL
    executeQuery(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SQL :', err)
            return handleResponse(res, 500, 'Erreur serveur')
        }
        console.log('Succès')
        return handleResponse(res, 200)
    })
}


module.exports = {setQueryLastId, setQuery}