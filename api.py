from flask_restful import Api
from app import app
from flask_restful.utils import cors
from resources.nfl.player import NFL_Player_2015, All_NFL_Players_2015
from resources.nfl.team import NFL_Teams_2015, NFL_Team_2015
import resources.nfl.totals as t
import resources.nfl.games as g
import resources.nfl.trending as trend



from models.nfl_qb_game_2015 import NFL_QB_Game_2015_M
from models.nfl_rb_game_2015 import NFL_RB_Game_2015_M
from models.nfl_wr_game_2015 import NFL_WR_Game_2015_M
from models.nfl_te_game_2015 import NFL_TE_Game_2015_M


api = Api(app)
api.decorators = [cors.crossdomain(origin='*')]

# Public APIS

api.add_resource(NFL_Teams_2015, '/api/nfl/teams')
api.add_resource(NFL_Player_2015, '/api/nfl/player/<int:player_id>', endpoint='player_id')
api.add_resource(NFL_Team_2015, '/api/nfl/team/<int:team_id>', endpoint='team_id')

# Private APIS

api.add_resource(All_NFL_Players_2015, '/api/nfl/players')
api.add_resource(t.Pos_Totals_2015, '/api/nfl/totals/<string:pos>')
api.add_resource(g.Pos_Games_2015, '/api/nfl/games/<string:pos>')
api.add_resource(trend.Trending_Players, '/api/nfl/trending')
