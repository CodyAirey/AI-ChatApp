// Function to load all messages from the server and display them
async function loadAllMessages() {
    try {
        const response = await axios.get('/messages'); // Use a relative path to the server route
        const messages = response.data;

        // Clear the chat container
        let chatContainer = document.getElementById("chat-log-container");
        chatContainer.innerHTML = '';

        let className;

        // Loop through messages and create message elements
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

// Function to submit a new message to the server
async function submitNewMessage() {
    if (userName == "") return; // If no userName, stop

    /* Get input form data */
    const msgInput = document.querySelector('#message-text');
    if (msgInput.value == "") return; // If no message, stop
    const message = msgInput.value;
    msgInput.value = ""; // Clear the input form

    /* Create local message element on the page */
    createMessageElement(
        "message-self",
        userName,
        message,
        new Date().getTime()
    );

    /* Prepare messageData to send to the server using Axios */
    const messageData = {
        "name": userName,
        "message": message,
        "time": new Date().getTime()
    };

    let body = JSON.stringify(messageData);

    const config = {
        headers: {
          'Content-Type': 'application/JSON'
        }
    };

    try {
        const response = await axios.post('/send-message', body, config);
        console.log(response.data); // Assuming the server responds with some data
        if (response.data === 'Message inserted successfully.') {
            // After AI message insertion, refresh messages
            loadAllMessages();
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Form submission event handler
function clickHandler(event) {
    event.preventDefault();
    submitNewMessage();
}
document.querySelector("#message-button").addEventListener('click', clickHandler);

let userName = "";

// Event listener for user name input
document.querySelector("#message-name").addEventListener('input', function() {
    const name = document.querySelector("#message-name").value;
    document.querySelector("p.my-img").textContent = emojiFromName(name);
    userName = name;
    localStorage.setItem("userName", userName);
});

// On page load, retrieve userName from localStorage
if(localStorage.getItem("userName") !== null) {
    userName = localStorage.getItem("userName");
    document.querySelector("#message-name").value = userName;
    document.querySelector("p.my-img").textContent = emojiFromName(userName);
}

setInterval(loadAllMessages, 5000);
loadAllMessages(); // Initial load
