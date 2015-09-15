from sqlalchemy.orm import sessionmaker
from models import NFL_Team_2015, db_connect, create_tables

class NFL_Team_2015_Pipeline(object):
    def __init__(self):
        """
        Initializes database connection and sessionmaker.
        Creates nfl_teams_2015 table.
        """
        engine = db_connect()
        create_tables(engine)
        self.Session = sessionmaker(bind=engine)

    def process_item(self, item, spider):
        """This method is called for every item pipeline component."""
        session = self.Session()
        team = NFL_Team_2015(**item)

        try:
            session.add(team)
            session.commit()
        except:
            session.rollback()
            print('error saving item!')
            raise
        finally:
            session.close()

        return item
