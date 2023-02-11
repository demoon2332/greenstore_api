const mongoose = require('mongoose')

const ObjectiveSchema = new mongoose.Schema({
    id: String,
    uid: String,
    periodid: String,
    org_id: String,
    name: String,
    status: Number,
    createdAt: String
})

module.exports = mongoose.model('Objective', ObjectiveSchema)

