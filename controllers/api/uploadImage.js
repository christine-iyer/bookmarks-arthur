const ImageSchema = require('../../models/fileUpload')

const uploadImage = async(req, res) => {
     const imageUploaded = new ImageSchema({
          image: req.file.path,
     })
     try {
          imageUploaded.save()
          
     } catch (error) {
          return res.status(400).json({
               message: `image upload failed, see ${error}`,
               status: 'error'
          })
          
     }
}