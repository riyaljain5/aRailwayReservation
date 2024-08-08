import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './models/user.js';
import Booking from './models/booking.js';
import Train from './models/train.js';
import Payment from './models/payment.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/railway")
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Database not connected", err));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, this is the backend server.');
});

// Route to fetch user with populated bookings
app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId)
            .populate('bookings') // Populate the bookings field with full details
            .exec();

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }
});

// Route to create a user
app.post('/submit', async (req, res) => {
    const { firstName, lastName, emailAddress, password, mobileNumber, gender } = req.body;
  
    try {
        const newUser = new User({
            firstName,
            lastName,
            emailAddress,
            password,
            mobileNumber,
            gender
        });

        const savedUser = await newUser.save();
     
        res.redirect(`/bookticket.html?userId=${savedUser._id}`);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error saving user');
    }
});

// Route to handle booking
app.post('/book', async (req, res) => {
    const { userId, from, to, class: cls, quota, date, adultPassengers, childPassengers } = req.body;

    try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Create a new booking
        const newBooking = new Booking({
            userId,
            from,
            to,
            class: cls,
            quota,
            date,
            adultPassengers,
            childPassengers,
            firstName: user.firstName,
            lastName: user.lastName
        });

        // Save the booking
        await newBooking.save();

        // Add the booking ID to the user's bookings array
        user.bookings.push(newBooking._id);
        await user.save();

        // Redirect to the desired page
        res.redirect('/table.html'); // Redirect to a page after booking
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).send('Error saving booking');
    }
});

// Route to save train data
app.post('/saveTrainData', async (req, res) => {
    const trains = req.body;

    try {
        await Train.insertMany(trains);
        res.json({ message: 'Train data saved successfully!' }); 
     
    } catch (error) {
        console.error('Error saving train data:', error);
        res.status(500).json({ error: 'Error saving train data' }); // Send JSON error response
    }
});

//payment
app.post('/payment', async (req, res) => {
    const { gateway, cardNumber, cvcNumber, price } = req.body;

    try {
        const newPayment = new Payment({
            gateway,
            cardNumber,
            cvcNumber,
            price
        });

        await newPayment.save();
        
        res.redirect('/successful.html'); // Redirect to a successful page after saving the payment
    } catch (error) {
        console.error('Error saving payment:', error);
        res.status(500).send('Error saving payment');
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
