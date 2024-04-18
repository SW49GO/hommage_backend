const {setQuery, setQueryLastId} = require('../config/connect')
const fs = require('fs')
// Supprimer un commentaire
exports.deleteComment = (req,res) =>{
    const {idComment} = req.body
    const sql = 'DELETE FROM comments WHERE id=?'
    setQuery(sql,[idComment],res)
}

// // Supprimer les commentaires lié à une photo
// exports.deleteCommentsPhoto = (req,res) =>{
//     const {photo_id} = req.body
//     const sql = 'DELETE FROM comments WHERE photo_id=?'
//     setQuery(sql,[photo_id],res)
// }

// Supprimer une photo de la BDD
exports.deletePhoto = (req,res) =>{
    const {id}= req.body
    const sql = 'DELETE FROM photos WHERE id=?'
    setQuery(sql,[id],res) 
}

// Supprimer un ami et les conversations
exports.deleteFriend = (req,res) =>{
    const {friend_id,user_id} = req.body
    const sql = 'DELETE FROM friends WHERE (friend_id=? AND user_id=?) OR (friend_id=? AND user_id=?)'
    const values = [friend_id, user_id, user_id, friend_id]
    setQuery(sql, values,(err1, result1) => {
        if (err1) {
            return res.sendStatus(500)
        }
        const sql2 = 'DELETE FROM tchat WHERE (friend_id=? AND user_id=?) OR (friend_id=? AND user_id=?)'
        setQuery(sql2, values, (err2, result2) => {
            if (err2) {
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        })
    })
}

// Supprimer un compte utilisateur
exports.deleteUserAccount = (req,res) =>{
    const {id} =req.body
    const sql = 'DELETE FROM users WHERE id=?'
    setQuery(sql,[id],res)
}

// Supprimer une fiche d'un défunt et sa photo de profil
exports.deleteOneDefunct = (req,res) =>{
    const {id, idDef} = req.body
    console.log('req.body:', req.body)
    // Delete the photo profil
    const photoPathProfil = `./images/users/${id}`

    fs.access(photoPathProfil, fs.constants.F_OK, (err) => {
        if (err && err.code === 'ENOENT') {
          console.error('Le dossier n\'existe pas.')
        } 
        const photoDefProfil = `./images/users/${id}/photodef${idDef}.jpeg`
        fs.unlink(photoDefProfil, (err) =>{
            if (err) {
                console.error('Erreur lors de la suppression du fichier :', err)
            }
            console.log(`Le fichier a été supprimé avec succès.`)
        })
    })
    const filePath = `./images/photos/${idDef}`
    // Access to folder
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err && err.code === 'ENOENT') {
          console.error('Le dossier n\'existe pas.')
        }
        fs.readdir(filePath, (err, files) => {
            if (err) {
              console.error('Erreur lors de la lecture du répertoire :', err)
              return
            }
            // Check if there is files start with the user id
            const filesStartingWithOne = files.filter(file => file.startsWith(id))

            if (filesStartingWithOne) { 
                if(files.length > filesStartingWithOne.length){
                    console.log('suppr')
                    filesStartingWithOne.forEach((file) => {
                        const fileToDelete = `${filePath}/${file}`
                        console.log('fileToDelete:', fileToDelete)
                        fs.unlink(fileToDelete, (err) => {
                            if (err) {
                                console.error('Erreur lors de la suppression du fichier :', err)
                                return
                            }
                            console.log(`Le fichier ${fileToDelete} a été supprimé avec succès.`)
                        })
                    })
                }else{
                    filesStartingWithOne.forEach((file) => {
                        const fileToDelete = `${filePath}/${file}`
                        console.log('fileToDelete:', fileToDelete)
                        fs.unlink(fileToDelete, (err) => {
                            if (err) {
                                console.error('Erreur lors de la suppression du fichier :', err)
                                return
                            }
                            console.log(`Le fichier ${fileToDelete} a été supprimé avec succès.`)
                        })
                    })
                    // Delete the empty folder
                    fs.rmdir(filePath, (err) => {
                        if (err) {
                            console.error('Erreur lors de la suppression du dossier :', err)
                            return
                        }
                        console.log(`Le dossier a été supprimé avec succès.`)
                    })
                }
            } else {
              console.log('Aucun fichier trouvé')
            }
          }) 
    })
    const sql = 'DELETE FROM defuncts WHERE user_id=? AND id=?'
    const values1 = [id, idDef]
    setQuery(sql, values1)
    .then(() => {
        console.log('1er ok')
        const sql2 = 'DELETE FROM user_admin WHERE defunct_id=? AND user_id=?'
        const values2 = [idDef, id]
        return setQuery(sql2, values2)
    })
    .then(() => {
        console.log('2eme ok')
        const sql3 = 'DELETE FROM comments WHERE user_id=? AND defunct_id=?'
        const values3 = [id, idDef]
        return setQuery(sql3, values3)
    })
    .then(() => {
        console.log('3eme ok')
        return res.sendStatus(200)
    })
    .catch((err) => {
        console.error('Une erreur est survenue :', err)
        return res.sendStatus(500)
    })
}
