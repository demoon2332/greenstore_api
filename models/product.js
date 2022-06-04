const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    pid: {
        type: String,
        unique: true,
    },
    price: Number,
    title: String,
    url: String,
    country: String,
    brand: String,
    category_sn: String,
    details: String,
    discount: double    
})

module.exports = mongoose.model('Product',ProductSchema)