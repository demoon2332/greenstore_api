const mongoose = require('mongoose')

const KeyResultSchema = new mongoose.Schema({
    oid: String,
    uid: String,
    name: String,
    type: Number,
    criterias: Number,
    start: Number,
    target: String,
    self_grade: Number,
    grade: Number,
    duedate: String,
    status: Number, 
    createdAt: String
})

module.exports = mongoose.model('KeyResult', KeyResultSchema)