const {setQuery, setQueryLastId} = require('../config/connect')

// Mise à jour de la date et heure de connexion
exports.updateLastLogin = (req,res) =>{
    const {id} = req.body
    const sql = 'UPDATE users SET last_log=NOW() WHERE id = ?'
    const values = [id]
    setQuery(sql,values,res)
}

// Mise à jour du nom de la photo de defunt
exports.updatePhoto = (req,res) =>{
    const {name,id} = req.body
    const sql = 'UPDATE photos SET name = ? WHERE id = ?'
    const values = [name,id]
    setQuery(sql,values,res)
}

// Mise à jour informations profil
exports.updateUser = (req,res) =>{
    const {id,pseudo,email,number_road,address,postal_code,city} = req.body
    const sql = 'UPDATE users SET pseudo=?, email=?,number_road=?,address=?,postal_code=?,city=? WHERE id=?'
    const values = [pseudo,email,number_road,address,postal_code,city,id]
    setQuery(sql,values,res)
}

/*A FAIRE
// Mise à jour mot de passe
public function updatePassword(string $pass, int $id) :void{
    $pass = password_hash($pass, PASSWORD_BCRYPT);
    $data = ['id'=>$id, 'password'=>$pass];
    $query = "UPDATE users SET password=:password WHERE id=:id";
    $this->getQuery($query,$data);
}
*/

// Mise à jour de la validation d'une demande d'ami 
exports.updateFriend = (req,res) =>{
    const {validate,user_id,friend_id} = req.body
    const sql = 'UPDATE friends SET validate=?,date_crea=NOW() WHERE user_id=? AND friend_id=?'
    const values = [validate,friend_id,user_id]
    setQuery(sql,values,res)
}

// Mise à jour du status "online" pour le tchat
exports.updateOnline = (req,res) =>{
    const {id,online} = req.body
    const sql = 'UPDATE users SET online=? WHERE id=?'
    const values = [online,id]
    setQuery(sql,values,res)
}

// Mise à jour du transfert de compte des defunts d'un utilisateur vers un autre
exports.updateNewAdminDefunct = (req,res) =>{
    const {user_id,id} = req.body
    const sql = 'UPDATE defuncts SET user_id=? WHERE id=?'
    const values = [user_id,id]
    setQuery(sql, values, (err1, result1) => {
        if (err1) {
            return res.sendStatus(500)
        }
        const sql2 = 'UPDATE user_admin SET user_id=? WHERE id=?'
        setQuery(sql2, values, (err2, result2) => {
            if (err2) {
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        })
    })
}

// Mise à jour des informations d'un défunt
exports.updateInfosDefunct = (req,res) =>{
    const {lastname,firstname,birthdate,death_date,cemetery,city_birth,city_death,postal_code,id}= req.body
    const sql = 'UPDATE defuncts SET lastname=?, firstname=?, birthdate=?, death_date=?, cemetery=?, city_birth=?, city_death=?, postal_code=? WHERE id=?'
    const values = [lastname,firstname,birthdate,death_date,cemetery,city_birth,city_death,postal_code,id]
    setQuery(sql,values,res)
}

// Enregistrement photo de profil du defunt
exports.updateDefPhoto = (req,res) =>{
    const {photo,id} = req.body
    const sql = 'UPDATE defuncts SET photo=? WHERE id=?'
    const values = [photo,id]
    setQuery(sql,values,res)
}

// Mise à jour des messages lus dans le tchat
exports.updateTchatRead = (req,res) =>{
    const {friend_id,user_id} = req.body
    const sql = 'UPDATE tchat SET `read`=1 WHERE friend_id=? AND user_id=?'
    const values = [friend_id,user_id]
    setQuery(sql,values,res)
}

// Mise à jour du destinataire d'une carte
exports.updateContentCard = (req,res) =>{
    const {user_send_id,id}= req.body
    const sql = 'UPDATE content_card SET user_send_id=? WHERE id=?'
    const values = [user_send_id,id]
    setQuery(sql,values,res)
}