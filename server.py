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

@app.route('/cards', methods=['GET'])
def get_cards():
    board_id = request.get_json(silent=True)
    print("Card board id" ,board_id)
    cards = Cards.get_cards(board_id)
    json_cards = json.dumps(cards)
    return json_cards

@app.route('/cards', methods=['PUT'])
def save_card(board_id, name):
    card = Cards.save_card(board_id, name)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
