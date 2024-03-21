const {setQuery, setQueryLastId} = require('../config/connect')

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
/*
// supprimer une fiche d'un défunt et sa photo de profil
    public function deleteOneDefunct(int $defunct, int $user_id) :void{
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