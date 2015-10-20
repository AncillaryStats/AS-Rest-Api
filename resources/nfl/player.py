from app import db
from flask_restful import Resource
from models.nfl_player_2015 import NFL_Player_2015_M
from models.nfl_qb_game_2015 import NFL_QB_Game_2015_M
from models.nfl_rb_game_2015 import NFL_RB_Game_2015_M
from models.nfl_wr_game_2015 import NFL_WR_Game_2015_M
from models.nfl_te_game_2015 import NFL_TE_Game_2015_M
import utils
import importlib


pos_map = {
    'QB': NFL_QB_Game_2015_M,
    'RB': NFL_RB_Game_2015_M,
    'WR': NFL_WR_Game_2015_M,
    'TE': NFL_TE_Game_2015_M
}

class NFL_Player_2015(Resource):
    def get(self, player_id):
        row = NFL_Player_2015_M.query.filter(NFL_Player_2015_M.id == player_id).one()
        player = utils.to_dict(row)
        game_model = pos_map[player['position']]

        games = game_model.query.\
        filter(game_model.player_name == player['name']).\
        all()

        result = {
            'info': player,
            'games': [utils.to_dict(game) for game in games]
        }

        return result
