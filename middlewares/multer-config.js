const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const userId = req.userId.id
    const dest = req.admin.name
    if(dest==='profil'){
      const uploadPath = `images/users/${userId}`
    }else{
    
    }
  
    callback(null, uploadPath)
  },
  filename: (req, file, callback) => {
    const userId = req.userId.id // envoi d'un objet userId
    const extension = MIME_TYPES[file.mimetype]
    const fileName = `photo_${userId}.${extension}`
    callback(null, fileName)
  }
})

module.exports = multer({storage: storage}).single('image') // fichier unique et de format image


// const name = file.originalname.split(' ').join('_') // accès au nom original 
// const extension = MIME_TYPES[file.mimetype]
// callback(null, name + Date.now() + '.' + extension)