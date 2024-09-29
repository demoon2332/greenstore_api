import mongoose from 'mongoose';

// TCard that means Tarot cards
const TCardSchema = new mongoose.Schema({
    name: String,
    suit: String,
    number: Number,
    numberology: String,
    keywords: String,
    element: String,
    meaning: String,
    description: String,
    reversed: String,
    pulledTime: Number,
});

export default mongoose.model('TCard', TCardSchema);