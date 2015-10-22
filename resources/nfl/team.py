from app import db
from flask_restful import Resource
from flask_restful.utils import cors
from models.nfl_team_2015 import NFL_Team_2015_M
from models.nfl_player_2015 import NFL_Player_2015_M
from models.nfl_player_2015 import NFL_Player_2015_M
from models.nfl_qb_game_2015 import NFL_QB_Game_2015_M
from models.nfl_rb_game_2015 import NFL_RB_Game_2015_M
from models.nfl_wr_game_2015 import NFL_WR_Game_2015_M
from models.nfl_te_game_2015 import NFL_TE_Game_2015_M

import utils

class NFL_Team_2015(Resource):
    """Return list of player objects"""
    # @cors.crossdomain(origin='*')
    def get(self, team_id):
        roster = NFL_Player_2015_M.query.\
        filter(NFL_Team_2015_M.id == team_id).\
        filter(NFL_Team_2015_M.name == NFL_Player_2015_M.team).\
        all()

        return [utils.to_dict(player) for player in roster]


class NFL_Teams_2015(Resource):
    """Return list of player objects"""
    # @cors.crossdomain(origin='*')
    def get(self):
        return [team.to_dict() for team in NFL_Team_2015_M.query.all()]

# class NFL_Team_Game(Resource):
#     def get(self, team_id):
#         db.session.query(NFL_QB_Game_2015_M, NFL_RB_Game_2015_M, NFL_WR_Game_2015_M
#                          NFL_TE_Game_2015_M)
#                          .filter()

#         team = NFL_Team_2015_M.query.\
#         filter(NFL_Team_2015_M.idea == team_id)
#         .one()


