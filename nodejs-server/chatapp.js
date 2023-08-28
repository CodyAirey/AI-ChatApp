const mysql = require('mysql2');

const dbConfig = {
    host: '192.168.56.12',
    user: 'webuser',
    password: 'insecure_db_pw',
    database: 'fvision'
};

let connection;


// Function to create a connection with retries
function createConnectionWithRetries() {
    const maxRetries = 10;
    const retryInterval = 5000; // 5 seconds

    function attemptConnection(attempt) {
        console.log(`Attempt ${attempt} to connect to the database...`);
        const connection = mysql.createConnection(dbConfig);

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
            }
        });
    }

    attemptConnection(1);
}

// Initialize the connection
createConnectionWithRetries();

app.get('/messages.json', (req, res) => {
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
