const { Schema, model } = require('mongoose')

const bookmarkSchema = new Schema({
    title: { type: String, required: true },
    category: {type: String},
    image: { type: String },
    body: { type: String }
}, {
    timestamps: true
})


module.exports = model('Bookmark', bookmarkSchema)