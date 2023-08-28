//server.js
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const axios = require('axios'); // Import axios
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname)));

// stuff so messages get passed through axios 
app.use(express.urlencoded());  // To parse URL-encoded bodies
app.use(express.json()); //To parse JSON bodies

//  DB STUFF
const dbConfig = {
    host: '192.168.56.12',
    user: 'webuser',
    password: 'insecure_db_pw',
    database: 'fvision'
};

let connection;

// Function to create a connection with retries
function createConnectionWithRetries() {
    const maxRetries = 3;
    const retryInterval = 5000; // 5 seconds

    function attemptConnection(attempt) {
        console.log(`Attempt ${attempt} to connect to the database...`);
        connection = mysql.createConnection(dbConfig);

        connection.connect(error => {
            if (error) {
                console.error(`Error connecting to the database: ${error.message}`);
                if (attempt < maxRetries) {
                    setTimeout(() => attemptConnection(attempt + 1), retryInterval);
                } else {
                    console.error('Could not connect to the database after multiple attempts.');
                    process.exit(1); // Exit the application
                }
            } else {
                console.log('Connected to the database successfully.');
                startServer();
            }
        });
    }

    attemptConnection(1);
}


function startServer() {


    // Handle GET request
    app.get('/messages', (req, res) => {
        // Fetch messages from the database using the established connection
        connection.query('SELECT * FROM messages', (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error fetching messages from the database.');
            } else {
                res.json(results);
            }
        });
    });

    app.post('/send-message', (req, res) => {
        const messageData = req.body;
        const query = 'INSERT INTO messages (name, message, time) VALUES (?, ?, ?)';
        const values = [messageData.name, messageData.message, messageData.time];

        // Insert message into the database using the established connection
        connection.query(query, values, (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error inserting message into the database.');
            } else {
                res.send('Message inserted successfully.');
            }
        });
    });

    /* reload messages every 2 seconds */
    // loadAllMessages();
}

createConnectionWithRetries();


const IP_ADDRESS = 'localhost'; // Change this to your desired IP address
const PORT = 8080;
app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server running at http://${IP_ADDRESS}:${PORT}/`);
});


