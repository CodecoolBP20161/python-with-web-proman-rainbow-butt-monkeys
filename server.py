from flask import Flask, render_template
from models import *
import json

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/getboards', methods=['GET'])
def getBoards():
    boards = Boards.getBoards()
    json_boards = json.dumps(boards)
    return json_boards

@app.route('/saveboard', methods=['POST'])
def saveBoard(name, id):
    new_board = Boards.saveBoard(id, name)

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
