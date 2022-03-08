import mongoose from 'mongoose';

const luckySchema = new mongoose.Schema({
    number: Number,
    draw: Number,
});

export default mongoose.model('lucky', luckySchema)