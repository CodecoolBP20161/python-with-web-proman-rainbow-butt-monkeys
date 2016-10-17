from peewee import *
import config


db = PostgresqlDatabase(config.dbname, user=config.name)


class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = db


class Boards(BaseModel):
    id = PrimaryKeyField()
    name = CharField()

    @classmethod
    def getBoards(cls):
        data = cls.select(cls.name, cls.id)
        if data != []:
            dict = {}
            for i in data:
                dict['id'] = i.id
                dict['name'] = i.name
            return dict
        else:
            print("hülye vagy fiam")
            pass


    @classmethod
    def saveBoard(cls, board):
        cls.create(id=board.id, name=board.name)


class Cards(BaseModel):
    board_id = ForeignKeyField(Boards, related_name="cards")
    name = CharField()
    #status = TextField()

    @classmethod
    def getCards(cls):
        return cls.select()

    @classmethod
    def saveCard(cls, id, name):
        cls.create(board_id=id, name=name)
