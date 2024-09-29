import mongoose from 'mongoose';

const CarouselSchema = new mongoose.Schema({
    next_url: String,
    url: String,
});

export default mongoose.model('Carousel', CarouselSchema);