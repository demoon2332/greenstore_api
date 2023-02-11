const mongoose = require('mongoose')

//TCard that means Tarot cards
const TCardSchema = new mongoose.Schema({
    name: String,
    suit: String,
    number: Number,
    numberology: String,
    keywords: String,
    element: String,
    meaning: String,
    description: String,
    reversed: String,
    pulledTime: Number,
})

module.exports = mongoose.model('TCard', TCardSchema)