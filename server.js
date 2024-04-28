const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json());

// Define route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Define route for calculating simple interest
app.post('/calculate', (req, res) => {
    const { principal, rate, time } = req.body;
    const simpleInterest = (principal * rate * time) / 100;
    res.json({ simpleInterest });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
