const {getQuery} = require('../config/connect')

exports.getUserData = (req, res) => {
    const { id } = req.body
    const sql1 = 'SELECT id, email, firstname, lastname, number_road, address, city, postal_code, pseudo, photo FROM users WHERE id=?'
    const sql2 = 'SELECT affinity, add_share, email_share, card_real, card_virtuel, flower, new_user FROM user_admin WHERE user_id=?'
  
    getQuery(sql1,[id], res)
    .then(result => {
        let userData = result
        getQuery(sql2, [id], res)
        .then(result2=>{
            result2.forEach(item => {
                userData.push(item)
            })
            res.json({ userData })
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({message:'Erreur'})
        })
    })
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Récupération l'id de l'utilisateur selon son email
exports.getEmail = (req,res) =>{
    const {email} = req.body
    const sql = 'SELECT id FROM users WHERE email=?'
    getQuery(sql,[email],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Récupération les infos de tout les défunts d'un utilisateur
exports.getUserDefunctList = (req,res) =>{
    const {id} = req.body
    const sql = 'SELECT id, lastname, firstname, birthdate, death_date, cemetery, city_birth, city_death, postal_code, photo FROM defuncts WHERE user_id=?'
    getQuery(sql,[id],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}
// Récupération toutes les infos d'un défunt selon son Id
exports.getInfoDefunct = (req,res) =>{
    const {idDef} = req.body
    const sql = 'SELECT id, lastname, firstname, birthdate, death_date, cemetery, city_birth, city_death, postal_code, user_id, photo FROM defuncts WHERE id=?'
    getQuery(sql,[idDef],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Récupération la liste des Id des defunts lié à un utilisateur
exports.getDefunctList = (req, res) => {
    const {user_id} = req.body
    const sql = 'SELECT id FROM defuncts WHERE user_id=?'
    getQuery(sql,[user_id],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

 // Récupération des identités de tout les defunts
exports.getAllDefuncts = (req,res) =>{
    const sql = 'SELECT id, user_id, lastname, firstname, birthdate, death_date FROM defuncts ORDER BY lastname'
    getQuery(sql,[],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// // Sélecteur de défunt
// public function defunctSelect() :string{
//     $select ='';
//     $info_def = $this->getAllDefuncts();
//     foreach($info_def as $i){
//         $select .= '<option value="'.$i['id'].'">'.$i['lastname'].' '.$i['firstname'].' &dagger; '.$i['death_date'].'</option>';
//     }
//     return $select;
// }

// Récupération de la liste des commentaires liés à une photo
exports.getListComment = (req,res) =>{
    const {photo_id} = req.body
    const sql = 'SELECT id, user_id, comment, profil_user, date_crea FROM comments WHERE photo_id=?'
    getQuery(sql,[photo_id],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Liste des photos liés à un defunt pour l'environnement
exports.photoListDefunct = (req,res) =>{
    const {defunct_id} = req.body
    const sql = 'SELECT id, user_id, name, date_crea FROM photos WHERE defunct_id=? ORDER BY id DESC'
    getQuery(sql,[defunct_id],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Liste des photos de défunt ajouté par un utilisateur
exports.photoDefByUser= (req,res) =>{
    const {user_id,defunct_id} = req.body
    const sql = 'SELECT name FROM photos WHERE user_id=? AND defunct_id=?'
    getQuery(sql,[user_id,defunct_id],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Affichage de la photo miniature d'un defunt
exports.getPhotoDef = (req,res) =>{
    const {id} = req.body
    const sql = 'SELECT user_id, photo FROM defuncts WHERE id=?'
    getQuery(sql,[id],res)
    .then(result => { 
        let pathPhoto
        if(result[0]['photo']){
            pathPhoto = `public/pictures/users/${result[0]['user_id']}/${result[0]['photo']}`
        }else{
            pathPhoto = 'public/pictures/site/noone.jpg'
        }
        res.json({pathPhoto})
    })
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Récupération de l'Id d'un defunt lié à une photo
exports.getIdDefPhoto = (req,res) =>{
    const {name}= req.body
    const sql = 'SELECT defunct_id FROM photos WHERE name=?'
    getQuery(sql,[name],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Liste des cartes ou bouquets de fleurs
exports.getProductsList = (req,res) =>{
    const {categories} = req.body
    const sql = 'SELECT id, name, price, info FROM products WHERE categories=?'
    getQuery(sql,[categories],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// // Information récupérée pour le tableau des cartes et les Id des cartes
// public function getCardTab():string {
//     $tab = '';
//     if(isset($_SESSION['nbCard']) && !empty($_SESSION['nbCard'])) {
//         foreach($_SESSION['nbCard'] as $c) {
//             $id_card = $this->getOrderCardId($c);
//             $cardInfo = $this->getProductInfo($id_card);
//             $tab .= '<tr><td>'.$cardInfo['info'].'</td><td>'.$cardInfo['price'].'€</td></tr>';
//         }
//     }
//     return $tab;
// }

// Récupération de l'Id d'une carte lié à un texte
exports.getOrderCardId= (req,res) =>{
    const {id}= req.body
    const sql = 'SELECT card_id FROM content_card WHERE id=?'
    getQuery(sql,[id],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// // Calcul du total du prix des cartes
// public function getCardTotal() {
//     $total = 0;
//     if(isset($_SESSION['nbCard']) && !empty($_SESSION['nbCard'])) {
//         foreach($_SESSION['nbCard'] as $c) {
//             $id_card = $this->getOrderCardId($c);
//             $cardInfo = $this->getProductInfo($id_card);
//             $total += $cardInfo['price'];
//         }
//     }
//     return $total;
// }
// exports.getCardTotal = (req,res) =>{

// }

// Récupération de la liste des information d'une carte
exports.getProductInfo = (req,res) =>{
    const {id}= req.body
    const sql = 'SELECT id, name, price, info FROM products WHERE id=?'
    getQuery(sql,[id],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Liste des achats d'un utilisateur
exports.getOrdersList= (req,res) =>{
    const {user_id} =req.body
    const sql = 'SELECT date_crea, total, user_send_id, lastname_send, cards_id, flowers_id FROM orders WHERE user_id=?'
    getQuery(sql,[user_id],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Liste des contenus de cartes par Id d'enregistrement 
exports.getContentList = (req,res) =>{
    const {id} = req.body
    const sql = 'SELECT user_id, content, card_id, date_crea, user_send_id FROM content_card WHERE id=?'
    getQuery(sql,[id],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Liste des achats par utilisateur
exports.getListBuyUser = (req,res) =>{
    const {id} = req.body
    const sql = 'SELECT date_crea, total, user_send_id, lastname_send, cards_id, flowers_id FROM orders WHERE user_id=?'
    let cards = []
    getQuery(sql,[id],res)
    .then(result => { 
        if (result.length > 0) {
            let cards = []
            result.forEach(row => {
                let listcards = JSON.parse(row.cards_id)
                cards.push({ idcards: listcards })
            });
            res.json({ cards })
        } else {
            res.json({ cards: [] })
        }
    })
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Récupération des 10 dernières photos pour le slider
exports.getHomeSlider = (req,res)=>{
    sql = 'SELECT MAX(user_id) as user_id, MAX(name) as name FROM photos GROUP BY defunct_id ORDER BY MAX(id) LIMIT 10'
    getQuery(sql,[],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Récupération des nouvelles photos ajoutées depuis la dernière connexion
exports.getRecentPhotos = (req,res) =>{
    const {defunct_id,last_log,user_id} = req.body
    const sql = 'SELECT id FROM photos WHERE defunct_id=? AND date_crea >? AND user_id!=?'
    values = [defunct_id,last_log,user_id]
    getQuery(sql,values,res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Récupération des nouveaux commentaires depuis la dernière connexion
exports.getRecentComments = (req,res) =>{
    const {defunct_id,last_log,user_id}= req.body
    const sql = 'SELECT id FROM comments WHERE defunct_id=? AND date_crea >? AND user_id!=?'
    values = [defunct_id,last_log,user_id]
    getQuery(sql,values,res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Récupération des infos d'un useradmin selon l'ID du défunt
exports.getUserAdminInfo = (req,res) =>{
    const {defunct_id} =req.body
    sql = 'SELECT user_id FROM user_admin WHERE defunct_id=?'
    getQuery(sql,[defunct_id],res)
    .then(result => { 
        if (result.length > 0) {
            const user_id = result[0].user_id
            const sqlUserInfo = 'SELECT * FROM users WHERE user_id=?'
            getQuery(sqlUserInfo, [user_id], res)
            .then(userAdmin => {
                const admin = userAdmin.length > 0 ? userAdmin[0] : null
                res.json({ user_id, admin })
            })
            .catch(err => {
                res.status(500).json({ message: err })
            });
        } else {
            res.json({ user_id: null, admin: null })
        }
    })
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Récupération des infos admin selon  un défunt
exports.getAdminDefunct = (req,res) =>{
    const {defunct_id} = req.body
    const sql = 'SELECT user_id, card_real, card_virtuel FROM user_admin WHERE defunct_id=?'
    getQuery(sql,[defunct_id],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Liste des amis enregistrée
exports.getFriendsList = (req,res) =>{
    const {user_id}= req.body
    const sql = 'SELECT friend_id, user_id, date_crea, validate FROM friends WHERE user_id=? OR friend_id=?'
    getQuery(sql,[user_id, user_id],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Liste des demande d'amis depuis la dernière connexion avec jointure pour ses informations
exports.getAskFriend = (req,res) =>{
    const {id}= req.body
    const sql = 'SELECT last_log FROM users WHERE id=?'
    getQuery(sql,[id],res)
    .then(result => { 
        if(result.length>0){
            const last_log = result[0].last_log
            const sql = 'SELECT user_id, validate, users.lastname, users.firstname FROM friends INNER JOIN users ON users.id=friends.user_id WHERE friend_id=? AND friends.date_crea < ?'
            getQuery(sql,[id,last_log],res)
            .then(friends => { res.json({ friends })})
            .catch(err => {
                res.status(500).json({message:err})
            })
        }
    })
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Récupération des 30 derniers messages pour le tchat
exports.getTchat = (req,res) =>{
    const {friend_id,user_id} = req.body
    sql = 'SELECT user_id, date_crea, content ,friend_id FROM tchat WHERE (friend_id=? AND user_id=?) OR (friend_id=? AND user_id=?) ORDER BY id DESC LIMIT 30'
    values = [friend_id,user_id,user_id,friend_id]
    getQuery(sql,values,res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}

// Nombre de message depuis la dernière connexion
exports.getNewTchat = (req,res) =>{
    const {user_id} = req.body
    const sql = 'SELECT user_id FROM tchat WHERE friend_id=? AND `read` = 0 GROUP BY user_id'
    getQuery(sql,[user_id],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}