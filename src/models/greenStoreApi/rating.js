const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
    pid: String,
    cus_id: String,
    cus_name: String,
    star: Number,
    comments: String    
})

module.exports = mongoose.model('Rating',RatingSchema)