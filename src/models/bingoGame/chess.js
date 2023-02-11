const mongoose = require('mongoose')

//TCard that means Tarot cards
const Chess = new mongoose.Schema({
    colorCode: String,
    lines: [
        {
            line_id: Number
        }
    ],
})

module.exports = mongoose.model('Chess', Chess)