const ImageUploadRouter = require('express').Router()
const { uploadImage } = require('../../controllers/api/uploadImage')
const parser = require('../../config/cloudinary-config')
ImageUploadRouter.post('/image', parser.single('image'), uploadImage)
module.exports = ImageUploadRouter