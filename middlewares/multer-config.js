const multer = require('multer')
const path = require('path')
const fs = require('fs')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log('file:', req.body)
    const { id, dest, defId } = req.body
    console.log('dest:', dest)
    console.log('id:', id)
    console.log('defId:', defId)

    let uploadPath
    if(dest==='profil'){
      uploadPath = `images/users/${id}`
      fs.mkdir(uploadPath, { recursive: true }, (err) => {
        if (err) {
          return callback(err)
        }
        callback(null, uploadPath)
      })
    }else{
      console.log('defId',defId)
      uploadPath = `images/photos/${defId}`
      fs.mkdir(uploadPath, { recursive: true }, (err) => {
        if (err) {
          return callback(err)
        }
        callback(null, uploadPath)
      })
    }
    console.log('uploadPath:', uploadPath)

  },
  filename: (req, file, callback) => {
    const {id, defId}=req.body
    const extension = MIME_TYPES[file.mimetype]
    if (defId) {
      const uploadPath = `images/photos/${defId}`
      fs.readdir(uploadPath, (err, files) => {
        if (err) {
          console.error('Erreur lors de la lecture du répertoire:', err)
          callback(err)
          return
        }
  
        const userFiles = files.filter(file => file.startsWith(`${parseInt(id)}-`))
        if(userFiles.length>0){const numbers = userFiles.map(file => parseInt(file.split('-')[1]))
          const maxNumber = Math.max(...numbers)
          const nextNumber = parseInt(maxNumber) + 1
          fileName = `${id}-${nextNumber}.${extension}`
        }else{
          fileName = `${id}-1.${extension}`
        }
        
        console.log('fileName:', fileName)
        callback(null, fileName)
      });
    } else {
      fileName = `photo_${id}.${extension}`
      console.log('fileName:', fileName)
      callback(null, fileName)
    }
  }
})

module.exports = multer({storage: storage,limits:{fileSize: 1024 * 1024 }}).single('image') 

