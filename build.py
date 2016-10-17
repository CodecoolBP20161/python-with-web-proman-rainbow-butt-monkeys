# This script can create the database tables based on your models

from models import *


db.connect()
db.drop_tables([Boards, Cards])
db.create_tables([Boards, Cards], safe=True)