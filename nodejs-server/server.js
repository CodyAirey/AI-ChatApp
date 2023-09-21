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

// Function to create a connection to DB with retries
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

    // Handle POST request to send a message
    app.post('/send-message', async (req, res) => {
        // Extract message data from the request body
        const messageData = req.body;

        // Define the SQL query and parameter values for message insertion
        const query = 'INSERT INTO messages (name, message, time) VALUES (?, ?, ?)';
        const values = [messageData.name, messageData.message, messageData.time];

        // Insert user message into the database
        connection.query(query, values, async (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error inserting message into the database.');
            }

            // Start conversation with AI Server
            const base_url = "http://192.168.56.13:5000/chat/";

            // Fetch available AI responders from AI Server
            const respondersResponse = await axios.post(base_url + "available_responders");
            const aiResponders = respondersResponse.data.response;

            // Initialize variables for conversation loop
            let currentResponderIndex = Math.floor(Math.random() * aiResponders.length);
            let continueConversation = true;
            let chance = 1.0; // Initial chance of continuing the conversation

            // Conduct a 'conversation' with AI responders
            while (continueConversation) {
                // Get the current AI responder
                const currentResponder = aiResponders[currentResponderIndex];
                let url = base_url + currentResponder;

                try {
                    // Send a request to the current AI responder
                    const aiResponse = axios.post(url);

                    if (aiResponse.status === 200) {
                        // Update the currentResponderIndex for the next iteration
                        currentResponderIndex = (currentResponderIndex + 1) % aiResponders.length;
                        // Decrease the chance of continuing the conversation
                        chance -= 0.2;
                        // Randomly decide if the conversation should continue
                        continueConversation = Math.random() < chance;
                    } else {
                        console.error('POST request failed');
                        continueConversation = false;
                        res.send("Bad times 1")
                    }
                } catch (error) {
                    console.error(error);
                    continueConversation = false; // Stop the conversation on error
                    res.send("Bad times")
                }
            }

            // Send a response indicating successful message insertion
            res.send('Message inserted successfully.');
        });
    });
}

createConnectionWithRetries();


const IP_ADDRESS = "loopback";
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://${IP_ADDRESS}:${PORT}/`);
});


