from db.conn import engine,Base
from models import booking, users

print("Creating tables in DB")
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)
print("Done")