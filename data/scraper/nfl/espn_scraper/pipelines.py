from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import text
from models import NFL_Team_2015, NFL_Player_2015, db_connect, create_tables

# Pipeline from processing nfl teams from 'nfl_team_info' spider
class NFL_Team_Info_2015_Pipeline(object):
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

        # Only process items for the nfl team info spider
        if spider.name == 'nfl_team_info':
            session = self.Session()
            team = NFL_Team_2015(**item)

            # Add team if it does not exist yet
            if not session.query(NFL_Team_2015).filter(NFL_Team_2015.name == item['name']).count():
                print('new team found!')
                try:
                    session.add(team)
                    session.commit()
                except:
                    session.rollback()
                    print('error saving item!')
                    raise
                finally:
                    session.close()
            else:
                print('team already exists')
                session.close()


        return item

# Pipeline from processing nfl teams from 'nfl_team_rosters' spider
class NFL_Player_2015_Pipeline(object):
    def __init__(self):
        """
        Initializes database connection and sessionmaker.
        Creates nfl_rosters_2015 table.
        """
        engine = db_connect()
        create_tables(engine)
        self.Session = sessionmaker(bind=engine)



    def process_item(self, item, spider):
        """This method is called for every item pipeline component."""
        print('processing')

        # Only process items for the nfl team info spider
        if spider.name == 'nfl_players':
            print(item)
            session = self.Session()
            player = NFL_Player_2015(**item)

            # Add team if it does not exist yet
            if not session.query(NFL_Player_2015).filter(NFL_Player_2015.name == item['name']).count():
                print('new player found!')
                try:
                    session.add(player)
                    session.commit()
                except:
                    session.rollback()
                    print('error saving item!')
                    raise
                finally:
                    session.close()
            else:
                print('player already exists')

        return item

