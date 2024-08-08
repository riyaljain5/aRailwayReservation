import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    gateway: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true,
        maxlength: 16 // Adjust length based on card number length (e.g., 15 for American Express)
    },
    cvcNumber: {
        type: String,
        required: true,
        minlength: 3, // Usually 3 digits
        maxlength: 4 // Some cards have a 4-digit CVC
    },
    price: {
        type: Number,
        required: true
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
