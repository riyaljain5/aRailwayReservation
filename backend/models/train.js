import mongoose from 'mongoose';

const trainSchema = new mongoose.Schema({
    
    trainNo: {
        type: Number,
        required: true
    },
    trainName: {
        type: String,
        required: true
    },
    arrival: {
        type: String,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Train = mongoose.model('Train', trainSchema);

export default Train;
