from flask import render_template, json, Response, jsonify
from flask.ext.sqlalchemy import SQLAlchemy
import decimal, datetime
from config import app, db

from models.nfl_team_2015 import NFL_Team_2015
from models.nfl_qb_game_2015 import NFL_QB_Game_2015


def cleanup_queries(results):
    data = []
    for result in results:
        result.__dict__.pop('_sa_instance_state', 'None')
        result.__dict__.pop('date', 'None')
        data.append(result.__dict__)
    return data

@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/qbs', methods=['GET'])
def get_qb_games():
    qb_games_2015 = NFL_QB_Game_2015.query.all()
    clean_games = cleanup_queries(qb_games_2015)
    js = json.dumps(clean_games)
    return js

if __name__ == '__main__':
    app.debug = True
    app.run();
