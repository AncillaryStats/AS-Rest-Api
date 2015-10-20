from flask_restful import Api
from app import app
from resources.nfl.player import NFL_Player_2015
from resources.nfl.team import NFL_Teams_2015

api = Api(app)

api.add_resource(NFL_Player_2015, '/api/player/<int:id>')
api.add_resource(NFL_Teams_2015, '/api/teams')