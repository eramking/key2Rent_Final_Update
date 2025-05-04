const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt'); // Ensure bcrypt is installed

const app = express();
const port = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'key2rent',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database.');
});

// API endpoint to get bookings
app.get('/api/getBookings', (req, res) => {
    const sql = 'SELECT * FROM bookings';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).json({ error: 'Failed to fetch bookings' });
        }

        const bookings = results.map((booking) => ({
            ...booking,
            items: JSON.parse(booking.items || '{}'), 
        }));

        res.json(bookings);
    });
});

// API endpoint to update booking status
app.post('/api/updateBookingStatus', (req, res) => {
    const { id, status } = req.body;

    if (!id || !status) {
        return res.status(400).json({ error: 'Invalid input. Missing id or status.' });
    }

    const sql = 'UPDATE bookings SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error('Error updating booking status:', err);
            return res.status(500).json({ error: 'Failed to update booking status' });
        }

        if (result.affectedRows > 0) {
            res.json({ message: 'Booking status updated successfully.' });
        } else {
            res.status(404).json({ error: 'Booking not found or status already set.' });
        }
    });
});

// API endpoint to add booking
app.post('/api/addBooking', (req, res) => {
    const { fullName, phoneNumber, pickupLocation, dropoffLocation, movingDate, items, price } = req.body;

    const sql = `
        INSERT INTO bookings (customer_name, phone_number, pickup_location, dropoff_location, moving_date, items, price, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')
    `;
    db.query(sql, [fullName, phoneNumber, pickupLocation, dropoffLocation, movingDate, JSON.stringify(items), price], (err, result) => {
        if (err) {
            console.error('Error adding booking:', err);
            return res.status(500).json({ error: 'Failed to add booking' });
        }
        res.json({ message: 'Booking added successfully' });
    });
});

// API endpoint to register user
app.post('/api/signup', async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [fullName, email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ error: 'Failed to register user' });
        }
        res.json({ message: 'User registered successfully' });
    });
});

// Login API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = 'SELECT password FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length > 0) {
            const hashedPassword = results[0].password;

            // Compare the provided password with the hashed password
            const bcrypt = require('bcrypt');
            if (bcrypt.compareSync(password, hashedPassword)) {
                res.json({ message: 'Login successful' });
            } else {
                res.status(401).json({ error: 'Invalid password' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});