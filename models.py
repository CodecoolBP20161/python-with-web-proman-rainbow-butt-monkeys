from peewee import *
import config


db = PostgresqlDatabase(config.dbname, user=config.name)


class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = db


class Boards(BaseModel):
    id = PrimaryKeyField()
    name = TextField()

    @classmethod
    def get_boards(cls):
        return cls.select()

    @classmethod
    def save_board(cls, board):
        cls.create(id=board.id, name=board.name)


class Cards(BaseModel):
    board_id = ForeignKeyField(Boards, related_name="cards")
    name = TextField()
    #status = TextField()

    @classmethod
    def get_cards(cls):
        return cls.select()

    @classmethod
    def save_card(cls, id, name):
        cls.create(board_id=id, name=name)
