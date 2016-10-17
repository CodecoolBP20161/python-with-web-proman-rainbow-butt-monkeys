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
    def getBoards(cls):
        return cls.select()

    @classmethod
    def saveBoard(cls, id, name):
        cls.create(id=id, name=name)


class Cards(BaseModel):
    board_id = ForeignKeyField(Boards, related_name="cards")
    name = TextField()
    #status = TextField()

    @classmethod
    def getCards(cls):
        return cls.select()

    @classmethod
    def saveCard(cls, id, name):
        cls.create(board_id=id, name=name)
