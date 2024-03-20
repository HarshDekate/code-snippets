const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'code_snippets_db' // Assuming the database name is "code_snippets_db"
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

// Middleware to parse JSON bodies
app.use(express.json());

// CORS Middleware
app.use(cors());

// Route to handle form submission
app.post('/api/code-snippets', (req, res) => {
    console.log('Received POST request to /api/code-snippets'); // Log incoming POST request
    const { username, language, stdin, sourceCode } = req.body;
    const query = 'INSERT INTO code_snippets (username, language, stdin, sourceCode) VALUES (?, ?, ?, ?)';
    connection.query(query, [username, language, stdin, sourceCode], (error, results, fields) => {
        if (error) {
            console.error('Error submitting code snippet:', error); // Log error
            res.status(500).json({ error: 'An error occurred while submitting the code snippet.' });
        } else {
            console.log('Code snippet submitted successfully!');
            res.status(201).json({ message: 'Code snippet submitted successfully!' });
        }
    });
});

// Handle OPTIONS requests for the /api/code-snippets endpoint
app.options('/api/code-snippets', (req, res) => {
    console.log('Received OPTIONS request to /api/code-snippets'); // Log incoming OPTIONS request
    // Set CORS headers to allow cross-origin requests
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    
    // Send a 200 OK response
    res.status(200).end();
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Route to fetch code snippets from the database
app.get('/api/code-snippets', (req, res) => {
    console.log('Received GET request to /api/code-snippets'); // Log incoming GET request
    const query = 'SELECT * FROM code_snippets';
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error fetching code snippets:', error); // Log error
            res.status(500).json({ error: 'An error occurred while fetching code snippets.' });
        } else {
            res.status(200).json(results); // Send code snippets as JSON response
        }
    });
});

