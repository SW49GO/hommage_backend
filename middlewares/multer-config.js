const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const { id, dest } = req.body
    const userId = id
    console.log('coucou')
    const destination = dest
    let uploadPath
    if(destination==='profil'){
      uploadPath = `images/users/${userId}`
    }else{
      uploadPath = `images/photos/${userId}`
    }
    if (uploadPath) {
      callback(null, uploadPath)
    } else {
        callback(new Error('Upload path is not defined'))
    }
  },
  filename: (req, file, callback) => {
    const userId = req.body.id 
    const extension = MIME_TYPES[file.mimetype]
    const fileName = `photo_${userId}.${extension}`
    callback(null, fileName)
  }
})

module.exports = multer({storage: storage}).single('image') // fichier unique et de format image
