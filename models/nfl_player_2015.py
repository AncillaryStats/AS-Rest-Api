from config import db

class NFL_Player_2015(db.Model):
    """2015 NFL players table"""
    __tablename__ = 'nfl_players_2015'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    number = db.Column(db.String)
    team = db.Column(db.String)
    position = db.Column(db.String)

    def __init__(self, name, number, team, position):
        self.name = name
        self.number = number
        self.team = team
        self.position = position

    def __repr__(self):
        return '<Player: %r, Team: %r>' % (self.name, self.team)
