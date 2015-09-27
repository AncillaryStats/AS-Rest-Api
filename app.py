from flask import render_template, json, Response, jsonify
from flask.ext.sqlalchemy import SQLAlchemy
import decimal, datetime
from config import app, db

from models.nfl_team_2015 import NFL_Team_2015
from models.nfl_player_2015 import NFL_Player_2015
from models.nfl_qb_game_2015 import NFL_QB_Game_2015
from models.nfl_rb_game_2015 import NFL_RB_Game_2015
from models.nfl_wr_game_2015 import NFL_WR_Game_2015
from models.nfl_te_game_2015 import NFL_TE_Game_2015

def cleanup_queries(results):
    data = []
    for result in results:
        result.__dict__.pop('_sa_instance_state', 'None')
        result.__dict__.pop('date', 'None')
        data.append(result.__dict__)
    return data

# Serve static AngularJS files
@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')

# Return qb game stats as json
@app.route('/qbs', methods=['GET'])
def get_qb_games():
    qb_games_2015 = NFL_QB_Game_2015.query.all()
    clean_games = cleanup_queries(qb_games_2015)
    js = json.dumps(clean_games)
    return js

# Return rb game stats as json
@app.route('/rbs', methods=['GET'])
def get_rb_games():
    rb_games_2015 = NFL_RB_Game_2015.query.all()
    clean_games = cleanup_queries(rb_games_2015)
    js = json.dumps(clean_games)
    return js

# Return nfl player info as json
@app.route('/players', methods=['GET'])
def get_players():
    nfl_players_2015 = NFL_Player_2015.query.all()
    clean_players = cleanup_queries(nfl_players_2015)
    js = json.dumps(clean_players)
    return js

@app.route('/player', methods=['GET'])
def get_player():
    pass


if __name__ == '__main__':
    app.run();
