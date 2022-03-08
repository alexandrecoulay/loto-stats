import mongoose from 'mongoose';

const drawSchema = new mongoose.Schema({
    first: Number,
    seconde: Number,
    third: Number,
    fourth: Number,
    fifth: Number,
    lucky: Number,
    created_at: Date,
});

export default mongoose.model('draws', drawSchema)