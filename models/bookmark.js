const { Schema, model } = require('mongoose')

const bookmarkSchema = new Schema({
    title: { type: String, required: true },
    category: {type: String},
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'imageUpload' }],
    body: { type: String }
}, {
    timestamps: true
})


module.exports = model('Bookmark', bookmarkSchema)