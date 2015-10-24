from app import db
from flask_restful import Resource, abort
from flask_restful.utils import cors
from models.nfl_player_2015 import NFL_Player_2015_M
from models.nfl_qb_game_2015 import NFL_QB_Game_2015_M
from models.nfl_rb_game_2015 import NFL_RB_Game_2015_M
from models.nfl_wr_game_2015 import NFL_WR_Game_2015_M
from models.nfl_te_game_2015 import NFL_TE_Game_2015_M
import utils

pos_map = {
    'QB': NFL_QB_Game_2015_M,
    'RB': NFL_RB_Game_2015_M,
    'WR': NFL_WR_Game_2015_M,
    'TE': NFL_TE_Game_2015_M
}

class NFL_Player_2015(Resource):
    """
    Return basic info, season totals and regular season games for a player by id
    """
    def get(self, player_id):
        try:
            row = NFL_Player_2015_M.query.filter(NFL_Player_2015_M.id == player_id).all()
            player = utils.to_dict(row)
            game_model = pos_map[player['position']]
            games = game_model.query.filter(game_model.player_name == player['name']).all()
        except:
            abort(400, response={
                'status': 400,
                'message': 'Player not found'
            })
        else:
            return utils.success(games)


class All_NFL_Players_2015(Resource):
    """
    Return basic info for all NFL players
    """
    def get(self):
        try:
            players = [utils.to_dict(player) for player in NFL_Player_2015_M.query.all()]
        except:
            abort(400, response={
                'status': 400,
                'message': 'Players not found'
            })
        else:
            return utils.success(players)

