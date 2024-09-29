import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: true
    },
    name: String,
    email: String,
    phone: String,
    password: String,
    address: String,
    createdAt: String
})

export default mongoose.model('User', UserSchema)