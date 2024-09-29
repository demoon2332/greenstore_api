import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    pid: {
        type: String,
        unique: true,
    },
    price: Number,
    title: String,
    url: String,
    country: String,
    brand: String,
    category_sn: String,
    details: String,
    discount: Number    
});

export default mongoose.model('Product', ProductSchema);
