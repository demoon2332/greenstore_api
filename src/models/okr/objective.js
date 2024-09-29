import mongoose from 'mongoose';

const ObjectiveSchema = new mongoose.Schema({
    id: String,
    uid: String,
    periodid: String,
    org_id: String,
    name: String,
    status: Number,
    createdAt: String
})

export default mongoose.model('Objective', ObjectiveSchema)

