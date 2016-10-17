from flask import Flask, render_template
from models import *
import json

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/boards', methods=['GET'])
def getBoards():
    boards = Boards.getBoards()
    # itt végig kéne menni egy for ciklussal és mindent jsonné alakítani.
    json_boards = json.dumps(boards)
    print(json_boards)
    return json_boards

@app.route('/boards', methods=['PUT'])
def saveBoard(board):
    board = json.load(board)
    new_board = Boards.saveBoard(board)

@app.route('/getcards', methods=['GET'])
def getCards(id):
    cards = Cards.select().where(id = Cards.board_id)
    json_cards = json.dumps(cards)
    return json_cards

@app.route('/savecard', methods=['POST'])
def saveCard(board_id, name):
    card = Cards.saveCard(board_id, name)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
