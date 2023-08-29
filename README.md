### Authors: Cody Airey, Jake Norton
# AI Chat Application

## Overview

Welcome to our Vagrant configuration repository, designed to set up and manage three Ubuntu virtual machines. These VMs collectively host a chat application that facilitates conversations with an AI. The AI-generated responses are often quirky and humorous, making the conversations engaging despite their unconventional nature.

### Disclaimer

While we've made efforts to create an entertaining and engaging chat experience, it's important to acknowledge that AI-generated responses might not always align with a typical conversation. Some responses may be nonsensical or even occasionally inappropriate. We've taken precautions to avoid models that promote hateful or offensive content, but unforeseen outputs are still possible. We encourage users to engage with the AI chat responsibly and maintain a friendly environment.


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


## License

This project is licensed under the terms of the MIT License. See the [LICENSE](LICENSE) file for details.