const {setQuery, setQueryLastId} = require('../config/connect')
const fs = require('fs')
// Supprimer un commentaire
exports.deleteComment = (req,res) =>{
    const {id} = req.body
    const sql = 'DELETE FROM comments WHERE id=?'
    setQuery(sql,[id],res)
}

// Supprimer les commentaires lié à une photo
exports.deleteCommentsPhoto = (req,res) =>{
    const {photo_id} = req.body
    const sql = 'DELETE FROM comments WHERE photo_id=?'
    setQuery(sql,[photo_id],res)
}

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
    const filePath = `./images/photos/${idDef}`
    // Access to folder
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err && err.code === 'ENOENT') {
          console.error('Le dossier n\'existe pas.')
          return
        }
        fs.readdir(filePath, (err, files) => {
            if (err) {
              console.error('Erreur lors de la lecture du répertoire :', err)
              return
            }
            // Check if there is files start with the user id
            const filesStartingWithOne = files.filter(file => file.startsWith(id))
            console.log('filesStartingWithOne:', filesStartingWithOne)
           
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
                    // Delete the photo profil
                    const photoDefProfil = `./images/users/${id}/photodef${idDef}.jpeg`
                    fs.unlink(photoDefProfil, (err) =>{
                        if (err) {
                            console.error('Erreur lors de la suppression du fichier :', err)
                            return
                        }
                        console.log(`Le fichier a été supprimé avec succès.`)
                    })
                }
            } else {
              console.log('Aucun fichier trouvé')
            }
          })
    
    })
    
        // // Supprimer le fichier s'il existe
        // fs.unlink(filePath, (err) => {
        //   if (err) {
        //     console.error('Erreur lors de la suppression du fichier :', err);
        //     return;
        //   }
        //   console.log('Le fichier a été supprimé avec succès.');
        // })
    
}
   /* public function deleteOneDefunct(int $defunct, int $user_id) :void{
        $folder = 'public/pictures/users/'.$user_id;
            if (is_dir($folder)){
                unlink ($folder.'/photodef'.$defunct.'.jpg');
            }
        $data = ['defunct_id'=>$defunct, 'user_id'=>$user_id];
        $query = "DELETE FROM comments WHERE user_id=:user_id AND defunct_id=:defunct_id";
        $this->getQuery($query,$data);
        $data = ['id'=>$defunct];
        $query = "DELETE FROM defuncts WHERE id=:id";
        $this->getQuery($query,$data);
        $data = ['defunct_id'=>$defunct];
        $query = "DELETE FROM user_admin WHERE defunct_id=:defunct_id";
        $this->getQuery($query,$data);
    }
exports.deleteOneDefunct = (req,res) =>{

}
*/