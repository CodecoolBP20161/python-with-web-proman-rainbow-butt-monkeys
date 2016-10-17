# This script can create the database tables based on your models

from models import *

db.connect()
db.drop_tables([Boards])
print("Drop tables")
db.create_tables([Boards, Cards], safe=True)
print("Create tables")
