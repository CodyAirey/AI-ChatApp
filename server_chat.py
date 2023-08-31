import pymysql
import time
import logging as logger
from flask import Flask, request, jsonify
from transformers import pipeline, Conversation, logging

logging.set_verbosity_error()
logger.basicConfig(filename='app.log', level=logger.INFO)
app = Flask(__name__)

dbConfig = {
    'host': '192.168.56.12',
    'user': 'webuser',
    'password': 'insecure_db_pw',
    'database': 'fvision'
}
connection = None
responders = ["elon", "PygmalionAI"]
# Function to create a connection with retries
responder1 = pipeline("conversational", model="Pi3141/DialoGPT-medium-elon-3")
responder2 = pipeline("conversational", model="abjbpi/Dwight_Schrute")

def createConnectionWithRetries():
    maxRetries = 100
    retryInterval = 5 # 5 seconds

    def attemptConnection(attempt):
        global connection
        logger.info(f'Attempt {attempt} to connect to the database...')
        try:
            connection = pymysql.connect(**dbConfig)
            
            logger.info('Connected to the database successfully.')
        except pymysql.MySQLError as e:
            logger.error(f'Error connecting to the database: {e}')
            if attempt < maxRetries:
                time.sleep(retryInterval)
                attemptConnection(attempt + 1)
            else:
                logger.error('Could not connect to the database after multiple attempts.')
                exit(1) # Exit the application
    attemptConnection(1)


def get_top_6_messages():
    global connection
    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            sql = "SELECT * FROM messages ORDER BY id DESC LIMIT 6"
            cursor.execute(sql)
            result = cursor.fetchall()
        return result
    except Exception as e:
        logger.error(f"Error fetching messages from the database: {e}")
        return None

def insert_message(name, message):
    global connection
    try:
        with connection.cursor() as cursor:
            sql = "INSERT INTO messages (name, message, time) VALUES (%s, %s, %s)"
            timestamp = int(time.time() * 1000)  # current time in milliseconds
            cursor.execute(sql, (name, message, timestamp))
            connection.commit()
        print(f"{name} (AI): {message}")    
        logger.info(f"{name} (AI): {message}")
    except Exception as e:
        logger.error(f"Error inserting message into the database: {e}")

@app.route(f'/get_db', methods=['POST'])
def get_db_route():
    success = get_top_6_messages()
    if success:
        return jsonify(success), 200
    else:
        return jsonify({'error': 'An error occurred'}), 500


@app.route('/debug', methods=['POST'])
def add_messages():
    user_input = request.json['user_input']
    insert_message("Jake", user_input)
    return jsonify({'status': 'success'})

@app.route(f'/{responders[0]}', methods=['POST'])
def chat_responder1():
    success, e = chat_with_responder(responders[0])
    if success:
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'error': e}), 500


@app.route(f'/{responders[1]}', methods=['POST'])
def chat_responder2():
    success, e = chat_with_responder(responders[1])
    if success:
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'error': e}), 500

def chat_with_responder(responder_name):
    try:
        
        # Get the 6 most recent messages from the database
        recent_messages = get_top_6_messages()
        
        # Extract the most recent message from the recent_messages list
        most_recent_message = recent_messages.pop(0)['message'] if recent_messages else ''
        
        # Separate the user inputs and generated responses into two separate lists
        past_user_inputs = [msg['message'] for msg in recent_messages if msg['name'] != responder_name]
        generated_responses = [msg['message'] for msg in recent_messages if msg['name'] == responder_name]
        
        # Create a Conversation object with the past conversation history
        conversation = Conversation(past_user_inputs=past_user_inputs, generated_responses=generated_responses)
        
        # Append the most recent user input to the conversation
        conversation.add_user_input(most_recent_message)
        
        # Get the response from the model
        if responder_name == responders[0]:
            conversation = responder1(conversation)
        elif responder_name == responders[1]:
            conversation = responder2(conversation)
        response = conversation.generated_responses[-1]
        
        # Append the model response to the generated_responses list
        generated_responses.append(response)
        insert_message(responder_name, response)
        
        return True, "no error"
    except Exception as e:
        logger.error(f"Error in chat_with_responder: {e}")
        return False, e


    


@app.route('/available_responders', methods=['POST'])
def send_available_responders():
    return jsonify({'response': responders})


if __name__ == '__main__':
    createConnectionWithRetries()
    app.run(host='192.168.56.13' , port=5000)
