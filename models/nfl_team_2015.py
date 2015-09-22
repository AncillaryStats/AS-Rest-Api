from config import db

class NFL_Team_2015(db.Model):
    """2015 NFL teams table"""
    __tablename__ = 'nfl_teams_2015'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    division = db.Column(db.String)

    def __repr__(self):
        return '<Team %r>' % self.name