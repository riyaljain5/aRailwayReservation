import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  
});

const User = mongoose.model('User', userSchema);

export default User;
