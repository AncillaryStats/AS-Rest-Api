import os
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'this needs to be changed soon'
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

class ProductionConfig(Config):
    DEBUG = False

class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True

class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True

class TestingConfig(Config):
    TESTING = True

app = Flask(__name__)
print(os.environ['DATABASE_URL'])
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://arosenberg@localhost:5432/nfl_test_2'
app.config.from_object(os.environ['APP_SETTINGS'])
db = SQLAlchemy(app)
