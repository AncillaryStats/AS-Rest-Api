from flask import json
from flask.ext.sqlalchemy import SQLAlchemy
from app import app, db
import datetime

from models.nfl_team_2015 import NFL_Team_2015
from models.nfl_player_2015 import NFL_Player_2015
from models.nfl_qb_game_2015 import NFL_QB_Game_2015
from models.nfl_rb_game_2015 import NFL_RB_Game_2015
from models.nfl_wr_game_2015 import NFL_WR_Game_2015
from models.nfl_te_game_2015 import NFL_TE_Game_2015

def cleanup_queries(results):
    """Converts date to string format and removes 'sa_instance_state' key """
    data = []
    for result in results:
        result.__dict__.pop('_sa_instance_state', 'None')
        item = result.__dict__
        if 'date' in item and item['date']:
            t = item['date']
            formatted_date = t.strftime('%m/%d/%Y')
            item['date'] = formatted_date
        data.append(item)
    return data

# Serve static AngularJS files
@app.route('/', methods=['GET'])
def index():
    """Serve AngularJS files"""
    return app.send_static_file('index.html')

# Return nfl player info as json
@app.route('/players', methods=['GET'])
def get_players():
    """Return NFL player info"""
    nfl_players_2015 = NFL_Player_2015.query.all()
    clean_players = cleanup_queries(nfl_players_2015)
    js = json.dumps(clean_players)
    return js

# All qb season totals 
@app.route('/qbs/total')
def get_qb_totals():
    """Return NFL QB season totals"""
    qb_games_reg_2015 = NFL_QB_Game_2015.query.filter_by(is_season_totals=True).all()
    clean_games = cleanup_queries(qb_games_reg_2015)
    return json.dumps(clean_games)


# All rb season totals
@app.route('/rbs/total')
def get_rb_season_totals():
    """Return NFL RB season totals"""
    rb_games_reg_2015 = NFL_RB_Game_2015.query.filter_by(is_season_totals=True).all()
    clean_games = cleanup_queries(rb_games_reg_2015)
    return json.dumps(clean_games)

# All wr season totals
@app.route('/wrs/total')
def get_wr_season_totals():
    """Return NFL WR season totals"""
    wr_games_reg_2015 = NFL_WR_Game_2015.query.filter_by(is_season_totals=True).all()
    clean_games = cleanup_queries(wr_games_reg_2015)
    return json.dumps(clean_games)

# All te season totals
@app.route('/tes/total')
def get_te_season_totals():
    """Return NFL TE season totals"""
    te_games_reg_2015 = NFL_TE_Game_2015.query.filter_by(is_season_totals=True).all()
    clean_games = cleanup_queries(te_games_reg_2015)
    return json.dumps(clean_games)

# All qb games
@app.route('/qbs/games')
def get_qb_game():
    """Return NFL QB regular season games"""
    qb_games_reg_2015 = NFL_QB_Game_2015.query.filter_by(is_season_totals=False).all()
    clean_games = cleanup_queries(qb_games_reg_2015)
    return json.dumps(clean_games)

# All rb games
@app.route('/rbs/games')
def get_rb_game():
    """Return NFL RB regular season games"""
    rb_games_reg_2015 = NFL_RB_Game_2015.query.filter_by(is_season_totals=False).all()
    clean_games = cleanup_queries(rb_games_reg_2015)
    return json.dumps(clean_games)

# All wr games
@app.route('/wrs/games')
def get_wr_game():
    """Return NFL WR regular season games"""
    wr_games_reg_2015 = NFL_WR_Game_2015.query.filter_by(is_season_totals=False).all()
    clean_games = cleanup_queries(wr_games_reg_2015)
    return json.dumps(clean_games)

# All te games
@app.route('/tes/games')
def get_te_game():
    """Return NFL TE regular season games"""
    te_games_reg_2015 = NFL_TE_Game_2015.query.filter_by(is_season_totals=False).all()
    clean_games = cleanup_queries(te_games_reg_2015)
    return json.dumps(clean_games)

