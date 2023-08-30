import pymysql
import time
from flask import Flask, request, jsonify
from transformers import pipeline, Conversation, logging

logging.set_verbosity_error()

app = Flask(__name__)

dbConfig = {
    'host': '192.168.56.12',
    'user': 'webuser',
    'password': 'insecure_db_pw',
    'database': 'fvision'
}
connection = None

# Function to create a connection with retries
def createConnectionWithRetries():
    maxRetries = 3
    retryInterval = 5 # 5 seconds

    def attemptConnection(attempt):
        nonlocal connection
        print(f'Attempt {attempt} to connect to the database...')
        try:
            connection = pymysql.connect(**dbConfig)
            print('Connected to the database successfully.')
        except pymysql.MySQLError as e:
            print(f'Error connecting to the database: {e}')
            if attempt < maxRetries:
                time.sleep(retryInterval)
                attemptConnection(attempt + 1)
            else:
                print('Could not connect to the database after multiple attempts.')
                exit(1) # Exit the application

    attemptConnection(1)

elon = pipeline("conversational", model="Pi3141/DialoGPT-medium-elon-3")

@app.route('/elon', methods=['POST'])
def chat_elon():
    user_input = request.json['user_input']
    conversation = Conversation(user_input)
    conversation = elon(conversation)
    response = conversation.generated_responses[-1]
    return jsonify({'response': response})

microsoft = pipeline("conversational", model="microsoft/DialoGPT-medium")

@app.route('/microsoft', methods=['POST'])
def chat_sarcasm():
    user_input = request.json['user_input']
    conversation = Conversation(user_input)
    conversation = microsoft(conversation)
    response = conversation.generated_responses[-1]
    return jsonify({'response': response})

if __name__ == '__main__':
    createConnectionWithRetries()
    app.run(host='192.168.56.13' , port=5000)
