const connection = require('../config/connect')

exports.signup = (req, res) => {
    // Récupérer les données de la requête
    const { nom, prenom, email } = req.body;
    console.log(' req.body:',  req.body)

    // Requête SQL pour insérer un nouvel utilisateur
    const sql = 'INSERT INTO user (nom, prenom, email) VALUES (?, ?, ?)';
    const values = [nom, prenom, email];

    // Exécuter la requête SQL
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', err)
            res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur')
            return
        }
        console.log('Utilisateur ajouté avec succès.');
        res.status(200).json({message:'Utilisateur ajouté avec succès'});
    })
}

exports.getAllUser = (req, res) =>{
    const sql = 'SELECT * FROM user'
    connection.query(sql,(err,result)=>{
        if(err){
            res.status(500).send('Erreur serveur')
            return
        }
        res.status(200).json({datas:result})
    })
}