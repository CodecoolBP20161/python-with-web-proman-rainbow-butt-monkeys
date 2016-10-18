from peewee import *
import config


db = PostgresqlDatabase(config.dbname, user=config.name)


class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = db


class Boards(BaseModel):
    name = CharField()
    board_id = CharField(255)

    @classmethod  # converting obj to dict for the json
    def get_boards(cls):
        data = cls.select(cls.name, cls.board_id)
        if data != []:
            list = []
            for i in data:
                dict = {}
                dict['board_id'] = i.board_id
                dict['name'] = i.name
                list.append(dict)
            return list
        else:
            print("hülye vagy fiam")
            pass


    @classmethod
    def save_board(cls, board):
        print(board['board_id'])
        print(board['name'])
        cls.create(board_id=board['board_id'], name=board['name'])


class Cards(BaseModel):
    board_id = ForeignKeyField(Boards, related_name="cards")
    name = CharField()
    #status = TextField()

    @classmethod
    def get_cards(cls, id):
        return cls.select().where(cls.board_id == id)

    @classmethod
    def save_card(cls, id, name):
        cls.create(board_id=id, name=name)
