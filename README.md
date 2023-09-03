### Authors: Cody Airey, Jake Norton

# AI Chat Application

## Overview

Welcome to our Vagrant configuration repository, designed to set up and manage three Ubuntu virtual machines. These VMs collectively host a chat application that facilitates conversations with an AI. The AI-generated responses are often quirky and humorous, making the conversations engaging despite their unconventional nature.

### Disclaimer

While we've made efforts to create an entertaining and engaging chat experience, it's important to acknowledge that AI-generated responses might not always align with a typical conversation. Some responses may be nonsensical or even occasionally inappropriate. We've taken precautions to avoid models that promote hateful or offensive content, but unforeseen outputs are still possible. We encourage users to engage with the AI chat responsibly and maintain a friendly environment.

### Running the application

To run the application you will need to have Vagrant and VirtualBox installed.
For reference, we used VirtualBox v6.1 & Vagrant 2.3.7

Once installed, have VirtualBox open in the background, and then run `vagrant up --provision` from the root of the repository.

The first provision will take a while as it needs to download and run the AI models, the subsequent boots should be quicker.

### Structure

1. **Web Server VM** - Hosts the frontend of the chat application
   - This VM runs a local Node.js server to serve the chat interface.
   - Accessible via it's IP: 192.168.56.11:8080 from the host machine's browser.
   - Messages sent from the browser are processed as follows:
     1. Stored in the database for future reference.
     2. Sent to the AI server to generate entertaining but often nonsensical replies.

<br>

2. **Database VM** - Manages the MySQL database for message storage

   - Contains a single, simple table to store message data.
   - The table structure includes fields for name, message, and timestamp.
   - Default Static IP: 192.168.56.12

   ```sql
   CREATE TABLE messages (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255),
       message TEXT,
       time BIGINT
   );
   ```

<br>

3. **AI Server VM** - Hosts a Python Flask server with conversational AI models
   - Two AI models are loaded upon boot.
   - Interacting with the models is as simple as sending an HTTP POST request.
   - The AI Responders are huggingface conversational models https://huggingface.co/models?pipeline_tag=conversational&sort=trending
   - Most models from the conversational section will just work if you switch out to the model name, bare in mind that they come in different sizes
   - Since the routing for a responder is dynamic, you can easily add more by including another Hugging Face model in the responders array of the [server_chat.py](server_chat.py) file. 
   
   For example:
   ```
   {"name": "Harry", "model": "Aran/DialoGPT-small-harrypotter"}
   ```
   - Update the RAM and disk space allowed in the Vagrant file as needed (some models are quite large).
   - Quick reload can be done by with `sudo systemctl restart aiflask` ensuring you have updated the copy at `/home/vagrant/server_chat.py` 
   - There is a file `~/app.log` which contains the log from the flask server. This will show any HTTP requests as well as error messages if something goes wrong.



## License

This project is licensed under the terms of the MIT License. See the [LICENSE](LICENSE) file for details.
