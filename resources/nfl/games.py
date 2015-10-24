from app import db
from flask_restful import Resource, abort
from flask_restful.utils import cors
from models.nfl_player_2015 import NFL_Player_2015_M
from models.nfl_qb_game_2015 import NFL_QB_Game_2015_M
from models.nfl_rb_game_2015 import NFL_RB_Game_2015_M
from models.nfl_wr_game_2015 import NFL_WR_Game_2015_M
from models.nfl_te_game_2015 import NFL_TE_Game_2015_M
import utils

model_map = {
    'qbs': NFL_QB_Game_2015_M,
    'rbs': NFL_RB_Game_2015_M,
    'wrs': NFL_WR_Game_2015_M,
    'tes': NFL_TE_Game_2015_M
}

class Pos_Games_2015(Resource):
    """
    Return all regular season games for a given position - QB, RB, WR, TE
    """
    def get(self, pos):
        m = model_map[pos]
        try:
            games = [utils.to_dict(m) for m in m.query.filter_by(is_season_totals=False).all()]
        except:
            abort(400, response={
                'status': 400,
                'message': 'Games not found'
            })
        else:
            return utils.success(games)

