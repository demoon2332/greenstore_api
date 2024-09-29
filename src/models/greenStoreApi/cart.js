import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    oid: String,
    cus_id: String,
    items: [
        {
            pid: String,
            price: Number,
            title: String,
            url: String,
            quantity: Number,
        }
    ],
    createdAt: String
});

export default mongoose.model('Cart', CartSchema);
