const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: true
    },
    title: String,
    description: String,
    status: String,
    createdAt: String
})

module.exports = mongoose.model('Project', ProjectSchema)