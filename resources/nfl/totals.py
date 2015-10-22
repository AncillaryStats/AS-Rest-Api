from app import db
from flask_restful import Resource
from flask_restful.utils import cors
from models.nfl_player_2015 import NFL_Player_2015_M
from models.nfl_qb_game_2015 import NFL_QB_Game_2015_M
from models.nfl_rb_game_2015 import NFL_RB_Game_2015_M
from models.nfl_wr_game_2015 import NFL_WR_Game_2015_M
from models.nfl_te_game_2015 import NFL_TE_Game_2015_M
import utils
import json

# class NFL_QB_Totals_2015(Resource):
class QB_Totals_2015(Resource):
    # @cors.crossdomain(origin='*')
    def get(self):
        qb_totals = NFL_QB_Game_2015_M.query.filter_by(is_season_totals=True).all()
        print qb_totals

        # for total in NFL_QB_Game_2015_M.query.filter_by(is_season_totals=True).all():
        #     print json.dumps(utils.to_dict(total))

        qb_totals = [utils.to_dict(total) for total in NFL_QB_Game_2015_M.query.filter_by(is_season_totals=True).all()]
        # print qb_totals
        return qb_totals

# class NFL_RB_Totals_2015(Resource):
class RB_Totals_2015(Resource):
    # @cors.crossdomain(origin='*')
    def get(self):
        # qb_totals = NFL_QB_Game_2015.query.filter_by(is_season_totals=True).all()
        return [utils.to_dict(total) for total in NFL_RB_Game_2015_M.query.filter_by(is_season_totals=True).all()]

# class NFL_WR_Totals_2015(Resource):
class WR_Totals_2015(Resource):
    # @cors.crossdomain(origin='*')
    def get(self):
        # qb_totals = NFL_QB_Game_2015.query.filter_by(is_season_totals=True).all()
        return [utils.to_dict(total) for total in NFL_WR_Game_2015_M.query.filter_by(is_season_totals=True).all()]

# class NFL_TE_Totals_2015(Resource):
class TE_Totals_2015(Resource):
    # @cors.crossdomain(origin='*')
    def get(self):
        # qb_totals = NFL_QB_Game_2015.query.filter_by(is_season_totals=True).all()
        return [utils.to_dict(total) for total in NFL_TE_Game_2015_M.query.filter_by(is_season_totals=True).all()]