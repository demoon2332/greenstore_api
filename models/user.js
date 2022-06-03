const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: true
    },
    email: String,
})

module.exports = mongoose.model('User', UserSchema)