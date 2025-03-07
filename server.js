const express = require('express');
const cors = require('cors');

// Initialize the app
const app = express();
const port = 3000;

// Use CORS for cross-origin requests (optional if frontend and backend are on different domains)
app.use(cors());

// Use JSON middleware to parse request bodies
app.use(express.json());

// Example in-memory seat count (you can use a database in a real-world scenario)
let availableSeats = 50;

// Route to handle the root URL (http://localhost:3000)
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Tournament Registration</h1>');
});

// Endpoint to register for the tournament (Decreases available seats)
app.post('/register', (req, res) => {
    if (availableSeats > 0) {
        availableSeats--; // Decrease available seats
        res.json({
            success: true,
            availableSeats: availableSeats
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'No seats available'
        });
    }
});

// Endpoint to get the current available seats
app.get('/seats', (req, res) => {
    res.json({
        availableSeats: availableSeats
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
