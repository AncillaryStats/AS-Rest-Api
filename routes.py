from flask import json
import redis
import os
from flask.ext.sqlalchemy import SQLAlchemy
from app import app, db

from models.nfl_team_2015 import NFL_Team_2015
from models.nfl_player_2015 import NFL_Player_2015
from models.nfl_qb_game_2015 import NFL_QB_Game_2015
from models.nfl_rb_game_2015 import NFL_RB_Game_2015
from models.nfl_wr_game_2015 import NFL_WR_Game_2015
from models.nfl_te_game_2015 import NFL_TE_Game_2015

redis_url = os.environ['REDISTOGO_URL']

r = redis.StrictRedis.from_url(redis_url, db=0)

def redis_cache(key, query, ttl=30):
    """
    Check redis for query results before checking db
    Default expire time = 30 seconds (FIXME)
    """
    print 'checking redis cache'
    if r.get(key):
        print 'returning data found in cache'
        return r.get(key)
    else:
        print 'retrieving and caching new query results'
        results = cleanup_queries(query())
        js = json.dumps(results)
        r.set(key, js)
        r.expire(key, ttl)
        return js



def cleanup_queries(results):
    """Converts date to string format and removes 'sa_instance_state' key"""
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
    nfl_players = redis_cache('nfl_players_key', NFL_Player_2015.query.all)
    return nfl_players

#####################
#   SEASON TOTALS   #
#####################

# All qb season totals
@app.route('/totals/qbs')
def get_qb_totals():
    """Return NFL QB season totals"""
    qb_totals = redis_cache('qb_games_key', NFL_QB_Game_2015.query.filter_by(is_season_totals=True).all)
    return qb_totals

# All rb season totals
@app.route('/totals/rbs')
def get_rb_season_totals():
    """Return NFL RB season totals"""
    rb_totals = redis_cache('rb_games_key', NFL_RB_Game_2015.query.filter_by(is_season_totals=True).all)
    return rb_totals

# All wr season totals
@app.route('/totals/wrs')
def get_wr_season_totals():
    """Return NFL WR season totals"""
    wr_totals = redis_cache('wr_games_key', NFL_WR_Game_2015.query.filter_by(is_season_totals=True).all)
    return wr_totals

# All te season totals
@app.route('/totals/tes')
def get_te_season_totals():
    """Return NFL TE season totals"""
    te_totals = redis_cache('te_games_key', NFL_TE_Game_2015.query.filter_by(is_season_totals=True).all)
    return te_totals

#############################
#   REGULAR SEASONS GAMES   #
#############################

# All qb games
@app.route('/games/qbs')
def get_qb_game():
    """Return NFL QB regular season games"""
    qb_games_reg_2015 = NFL_QB_Game_2015.query.filter_by(is_season_totals=False).all()
    clean_games = cleanup_queries(qb_games_reg_2015)
    return json.dumps(clean_games)

# All rb games
@app.route('/games/rbs')
def get_rb_game():
    """Return NFL RB regular season games"""
    rb_games_reg_2015 = NFL_RB_Game_2015.query.filter_by(is_season_totals=False).all()
    clean_games = cleanup_queries(rb_games_reg_2015)
    return json.dumps(clean_games)

# All wr games
@app.route('/games/wrs')
def get_wr_game():
    """Return NFL WR regular season games"""
    wr_games_reg_2015 = NFL_WR_Game_2015.query.filter_by(is_season_totals=False).all()
    clean_games = cleanup_queries(wr_games_reg_2015)
    return json.dumps(clean_games)

# All te games
@app.route('/games/tes')
def get_te_game():
    """Return NFL TE regular season games"""
    te_games_reg_2015 = NFL_TE_Game_2015.query.filter_by(is_season_totals=False).all()
    clean_games = cleanup_queries(te_games_reg_2015)
    return json.dumps(clean_games)

