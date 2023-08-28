//const BASE_URL = 'http://oucs1594mac.student.uod.otago.ac.nz:8080'
//const fetch = require('node-fetch'); 
const BASE_URL = 'http://localhost:8080'
const ENDPOINT = "messages.json"
const URL = "http://localhost:8080/messages.json"
// client's user name
let userName = ""
/* this function reloads ALL messages from the server */
async function loadAllMessages() {
    /* TASK 3 */
    
    /* 1: fetch messages.json */
    let response = await fetch("http://localhost:8080/messages.json");
    if (response.status == 200) {
        console.log('Fetch success!'); // HTML status code, 404 is "not found"
      }
    let data = await response.json();
    /* 2: clear chat-log-container */
    let e = document.getElementById("chat-log-container");
    e.innerHTML = '';
    /* 3: for each message in array */
    /* create each message element */
    let messageClass;
    data.forEach(element => {
        if(element.name === userName){
            messageClass= "message-self";
        }else{
            messageClass= "message-other";
        }
        createMessageElement(messageClass, element.name, element.message, element.time);
    });

        
    
    
}
/* reload messages every 2 seconds */
setInterval(function() {
    loadAllMessages();
}, 2000);



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
    const messageData = {
        "name": userName,
        "message": message,
        "time": new Date().getTime()
    };
    const stringToPost = JSON.stringify(messageData)
    const options = {
        method: 'POST',
        body: stringToPost,
        headers: { 'Content-Type': 'application/json' }
    }
    let url = "http://localhost:8080/send-message";
    // const response = await fetch(url, options);
    // console.log(await response.text());

    const promise = fetch(url, options);
    const success = (response) => console.log(response.text());
    const failure = (error) => console.log(error);

    promise.then(success).catch(failure);
}
/* form submission event handler */
function clickHandler(event) {
    event.preventDefault();
    submitNewMessage();
}
document.querySelector("#message-button").addEventListener('click', clickHandler);

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

