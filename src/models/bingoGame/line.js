const mongoose = require('mongoose')

//TCard that means Tarot cards
const B_line = new mongoose.Schema({
    line_id: Number,
    numbers: String
})

module.exports = mongoose.model('B_line', B_line)