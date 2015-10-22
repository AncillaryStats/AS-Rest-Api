from app import db

class NFL_WR_Game_2015_M(db.Model):
    """2015 NFL wr games table"""
    __tablename__ = 'nfl_wr_games_2015'

    id = db.Column(db.Integer, primary_key=True)
    player_name = db.Column(db.String)

    date = db.Column(db.Date)
    opponent = db.Column(db.String)
    result = db.Column(db.String)
    receptions = db.Column(db.Integer)
    targets = db.Column(db.Integer)
    rec_yards = db.Column(db.Integer)
    avg_yards_per_rec = db.Column(db.Float)
    longest_rec = db.Column(db.Integer)
    rec_tds = db.Column(db.Integer)
    rush_attempts = db.Column(db.Integer)
    rush_yards = db.Column(db.Integer)
    avg_yards_per_rush = db.Column(db.Float)
    longest_rush = db.Column(db.Integer)
    rush_tds = db.Column(db.Integer)
    fumbles = db.Column(db.Integer)
    fumbles_lost = db.Column(db.Integer)
    is_season_totals = db.Column(db.Boolean)

    def __repr__(self):
        return '<Player: %r, Opp: %r>' % (self.player_name, self.opponent)
