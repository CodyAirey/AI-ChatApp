// client.js

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

/* this function sends a new message to the server */
async function submitNewMessage() {
    if (userName == "") return; // if no userName, stop

    /* get input form data */
    const msgInput = document.querySelector('#message-text');
    if (msgInput.value == "") return; // if no message, stop
    const message = msgInput.value;
    msgInput.value = ""; // clear the input form

    /* create local message element on the page */
    createMessageElement(
        "message-self",
        userName,
        message,
        new Date().getTime()
    );

    /* POST messageData to the server using Axios */
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
    } catch (error) {
        console.error("Error:", error);
    }
}



/* form submission event handler */
function clickHandler(event) {
    event.preventDefault();
    submitNewMessage();
}
document.querySelector("#message-button").addEventListener('click', clickHandler);

let userName = ""
/* whenever the user types their name, change emoji, save name in localStorage */
document.querySelector("#message-name").addEventListener('input', function() {
    const name = document.querySelector("#message-name").value;
    document.querySelector("p.my-img").textContent = emojiFromName(name);
    userName = name;
    localStorage.setItem("userName", userName);
});
/* on page load, get userName from localStorage */
if(localStorage.getItem("userName") !== null) {
    userName = localStorage.getItem("userName");
    document.querySelector("#message-name").value = userName;
    document.querySelector("p.my-img").textContent = emojiFromName(userName);
}

loadAllMessages(); // Initial load
