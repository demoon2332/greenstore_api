import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    pid: {
        type: String,
        unique: true,
    },
    cus_id: String,
    cus_name: String,
    star: Number,
    comments: String    
});

export default mongoose.model('Rating',RatingSchema)