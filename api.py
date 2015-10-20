from flask_restful import Api
from app import app
from resources.nfl.player import NFL_Player_2015
from resources.nfl.team import NFL_Teams_2015, NFL_Team_2015

api = Api(app)

api.add_resource(NFL_Teams_2015, '/api/teams')
api.add_resource(NFL_Player_2015, '/api/player/<int:player_id>', endpoint='player_id')
api.add_resource(NFL_Team_2015, '/api/team/<int:team_id>', endpoint='team_id')

