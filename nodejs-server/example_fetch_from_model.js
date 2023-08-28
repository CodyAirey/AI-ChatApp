const axios = require('axios');

const base_url = "http://192.168.56.13:5000/";
const elon = "elon";
const microsoft = "microsoft";

const choice = Math.random();
let chatter = elon;
if (choice < 0.5) {
    chatter = microsoft;
}

const messageData = { "user_input": message }; //assuming 'message' contains the user input

let url = base_url + chatter;
axios.post(url, messageData)
    .then((response) => {
        console.log(chatter + ":", response.data.response);
    })
    .catch((error) => {
        console.error(error);
    });
