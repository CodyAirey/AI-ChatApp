import requests
import random
base_url = "http://127.0.0.1:5000/" 
elon = "elon"
microsoft = "microsoft"
while True:
    user_input = input("You: ")
    if user_input.lower() == 'exit':
        break
    choice = random.random()
    chatter = elon
    if choice < 0.5:
        chatter = microsoft
    response = requests.post(base_url + chatter, json={'user_input': user_input})
    response_json = response.json()
    print(chatter,":", response_json['response'])
