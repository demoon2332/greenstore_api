const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    oid: String,
    cus_id: String,
    items: [
        {
            pid: String,
            price: Number,
            title: String,
            url: String,
            quantity: Number,
        }
    ],
    createdAt: String
})

module.exports = mongoose.model('Cart', CartSchema)