from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://arosenberg@localhost:5432/nfl_test_1'
db = SQLAlchemy(app)
