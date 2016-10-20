from flask import Flask, render_template, request
from models import *
import json

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/boards', methods=['GET'])
def get_boards():
    boards = Boards.get_boards()
    json_boards = json.dumps(boards)
    return json_boards

@app.route('/boards', methods=['PUT'])
def save_board():
    board = request.get_json(silent=True)
    new_board = Boards.save_board(board)
    return ""

@app.route('/getcards', methods=['POST'])
def get_cards():
    cards = Cards.get_cards()
    json_cards = json.dumps(cards)
    return json_cards

@app.route('/savecard', methods=['POST'])
def save_card():
    status_list = ["new", "done", "in-progress", "review"]
    fromjson = request.get_json(silent=True)
    print(fromjson)
    if fromjson["status"] != 'nothing':
        if fromjson['status'] in status_list:
            update_card = Cards.update_card(fromjson["status"], fromjson["cardName"])
    else:
        print(fromjson)
        card = Cards.save_card(fromjson["board_id"], fromjson["name"], fromjson["cardId"])

@app.route('/deletecard', methods=['POST'])
def delete_card():
    fromjson = request.get_json()
    Cards.delete_card(fromjson)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
