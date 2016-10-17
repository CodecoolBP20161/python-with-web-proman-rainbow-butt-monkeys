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


class Cards(BaseModel):
    board_id = ForeignKeyField(Boards, related_name="cards")
    name = TextField()
    status = TextField()