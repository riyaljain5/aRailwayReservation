import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true 
},
  from: { 
    type: String,
    required: true
 },
  to: { type: String, required: true },
  class: { type: String, required: true },
  quota: { type: String, required: true },
  date: { type: Date, required: true },
  adultPassengers: { type: Number, required: true },
  childPassengers: { type: Number, required: true },
  firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }

});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;