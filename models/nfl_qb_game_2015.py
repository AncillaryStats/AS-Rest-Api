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