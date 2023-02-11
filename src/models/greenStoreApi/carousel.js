const mongoose = require('mongoose')

const CarouselSchema = new mongoose.Schema({
    next_url: String,
    url: String, 
})

module.exports = mongoose.model('Carousel',CarouselSchema)