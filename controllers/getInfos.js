const {getQuery} = require('../config/connect')

exports.getUserData = (req, res) => {
    const { id } = req.body
    const sql1 = 'SELECT id, email, firstname, lastname, number_road, address, city, postal_code, pseudo FROM users WHERE id=?'
    const sql2 = 'SELECT affinity, add_share, email_share, card_real, card_virtuel, flower, new_user FROM user_admin WHERE user_id=?'
  
    getQuery(sql1, [id], res)
    .then(result => {
        let userData = result
        getQuery(sql2,[id], res)
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
    const {user_id} = req.body
    const sql = 'SELECT id, lastname, firstname, birthdate, death_date, cemetery, city_birth, postal_code FROM defuncts WHERE user_id=?'
    getQuery(sql,[user_id],res)
    .then(result => { res.json({ result })})
    .catch(err => {
        res.status(500).json({message:err})
    })
}
// Récupération toutes les infos d'un défunt selon son Id
exports.getInfoDefunct = (req,res) =>{
    const {id} = req.body
    const sql = 'SELECT id, lastname, firstname, birthdate, death_date, cemetery, city_birth, city_death, postal_code, user_id FROM defuncts WHERE id=?'
    getQuery(sql,[id],res)
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
// public function getPhotoDef(int $def_id):string {
//     $data = ['id'=>$def_id];
//     $query = "SELECT user_id, photo FROM defuncts WHERE id=:id";
//     $result = $this->getQuery($query,$data)->fetch();
//     if($result['photo']) {
//         return 'public/pictures/users/'.$result['user_id'].'/'.$result['photo'];
//     }
//         return 'public/pictures/site/noone.jpg';
// }  
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