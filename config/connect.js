const mysql = require('mysql')

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
function getQuery(sql, values, res) {
    return new Promise((resolve, reject) => {
        executeQuery(sql, values, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête SQL :', err)
                handleResponse(res, 500, 'Erreur serveur')
                reject(err)
            } else {
                console.log('Succès')
                resolve(result)
            }
        })
    })
}

function getQueryLastId(sql, values, res) {
    return new Promise((resolve, reject) => {
        executeQuery(sql, values, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête SQL :', err)
                handleResponse(res, 500, 'Erreur serveur')
                reject(err)
            } else {
                console.log('Succès')
                const lastId = result.insertId
                resolve(lastId)
            }
        })
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


module.exports = {getQuery, getQueryLastId, setQuery}