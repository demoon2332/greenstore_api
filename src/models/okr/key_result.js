import mongoose from 'mongoose';

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

export default mongoose.model('KeyResult', KeyResultSchema)