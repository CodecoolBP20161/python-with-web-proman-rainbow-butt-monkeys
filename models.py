from peewee import *
import config


db = PostgresqlDatabase(config.dbname, user=config.name)


class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = db


class Boards(BaseModel):
    id = IntegerField()
    name = TextField()

    def getBoards(self):
        return Boards.select()

    def saveBoard(self, id, name):
        Boards.create(id=id, name=name)


class Cards(BaseModel):
    board_id = ForeignKeyField(Boards, related_name="cards")
    name = TextField()
    #status = TextField()

    def getCards(self):
        return Cards.select()

    def saveCard(self, id, name):
        Cards.create(board_id=id, name=name)
