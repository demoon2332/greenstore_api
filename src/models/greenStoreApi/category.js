import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    short_name: {
        type: String,
        unique: true
    },
    name: String,
    url: String
})

export default mongoose.model('Category', CategorySchema)