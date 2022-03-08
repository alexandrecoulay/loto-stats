import mongoose from 'mongoose';

const numberSchema = new mongoose.Schema({
    number: Number,
    draw: Number,
});

export default mongoose.model('numbers', numberSchema)