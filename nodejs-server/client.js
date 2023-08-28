// client.js
const axios = require('axios'); // Import axios

async function loadAllMessages() {
    try {
        const response = await axios.get('/messages'); // Use a relative path to the server route
        const messages = response.data;

        let chatContainer = document.getElementById("chat-log-container");
        chatContainer.innerHTML = '';

        let className;

        messages.forEach(e => {
            if (e.name === userName) {
                className = "message-self";
            } else {
                className = "message-other";
            }
            createMessageElement(className, e.name, e.message, e.time);
        });
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

// loadAllMessages(); // Initial load
// setInterval(loadAllMessages, 2000); // Refresh every 2 seconds
