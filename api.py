from flask_restful import Api
from app import app
from flask_restful.utils import cors
from resources.nfl.player import NFL_Player_2015, All_NFL_Players_2015
from resources.nfl.team import NFL_Teams_2015, NFL_Team_2015
import resources.nfl.totals as t
import resources.nfl.games as g
import resources.nfl.trending as trend

api = Api(app)
api.decorators = [cors.crossdomain(origin='*')]

# Public APIS

api.add_resource(NFL_Teams_2015, '/api/nfl/teams')
api.add_resource(NFL_Player_2015, '/api/nfl/player/<int:player_id>', endpoint='player_id')
api.add_resource(NFL_Team_2015, '/api/nfl/team/<int:team_id>', endpoint='team_id')

# Private APIS

api.add_resource(All_NFL_Players_2015, '/api/nfl/players')
api.add_resource(t.QB_Totals_2015, '/api/nfl/totals/qbs')
api.add_resource(t.RB_Totals_2015, '/api/nfl/totals/rbs')
api.add_resource(t.WR_Totals_2015, '/api/nfl/totals/wrs')
api.add_resource(t.TE_Totals_2015, '/api/nfl/totals/tes')
api.add_resource(g.QB_Games_2015, '/api/nfl/games/qbs')
api.add_resource(g.RB_Games_2015, '/api/nfl/games/rbs')
api.add_resource(g.WR_Games_2015, '/api/nfl/games/wrs')
api.add_resource(g.TE_Games_2015, '/api/nfl/games/tes')
api.add_resource(trend.Trending_Players, '/api/nfl/trending')
