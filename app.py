from flask import Flask, render_template, json, Response, jsonify
from flask.ext.sqlalchemy import SQLAlchemy
import decimal, datetime

import decimal, datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://arosenberg@localhost:5432/nfl_test_1'
db = SQLAlchemy(app)

class NFL_Team_2015(db.Model):
    """2015 NFL teams table"""
    __tablename__ = 'nfl_teams_2015'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    division = db.Column(db.String)

    def __repr__(self):
        return '<Team %r>' % self.name

class NFL_QB_Game_2015(db.Model):
    """2015 NFL qb games table"""
    __tablename__ = 'nfl_qb_games_2015'

    id = db.Column(db.Integer, primary_key=True)
    player_name = db.Column(db.String)

    date = db.Column(db.Date)
    opponent = db.Column(db.String)
    result = db.Column(db.String)
    pass_completions = db.Column(db.Integer)
    pass_attempts = db.Column(db.Integer)
    pass_yards = db.Column(db.Integer)
    comp_percentage = db.Column(db.Float)
    avg_yards_per_pass = db.Column(db.Float)
    longest_pass = db.Column(db.Integer)
    pass_tds = db.Column(db.Integer)
    interceptions = db.Column(db.Integer)
    qb_rating = db.Column(db.Float)
    passer_rating = db.Column(db.Float)
    rush_attempts = db.Column(db.Integer)
    rush_yards = db.Column(db.Integer)
    avg_yards_per_rush = db.Column(db.Float)
    longest_rush = db.Column(db.Integer)
    rush_tds = db.Column(db.Integer)
    is_season_totals = db.Column(db.Boolean)

    def __repr__(self):
        return '<Player: %r, Opp: %r>' % (self.player_name, self.opponent)

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
