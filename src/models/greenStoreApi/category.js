const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    short_name: {
        type: String,
        unique: true
    },
    name: String,
    url: String
})

module.exports = mongoose.model('Category', CategorySchema)