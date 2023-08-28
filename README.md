### Authors: Cody Airey, Jake Norton
# AI ChatAPP

## Overview

This is a vagrant configuration repo designed to boot and provision 3 ubuntu virtual machines.

### Structure

- **Web Server** - Hosts front end for the application, a simple multiuser chat application running on a local node server
- **Database** - MySQL database to store messages 
- **AI Server** - Hosts a python flask server which has two conversational models loaded on boot. To interface with these models requires a simple HTTP POST request


