from flask import Flask, request, jsonify
from transformers import pipeline, Conversation, logging
logging.set_verbosity_error()

app = Flask(__name__)

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
    app.run(host='192.168.56.13' , port=5000)
