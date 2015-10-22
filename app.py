import os
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import redis

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
db = SQLAlchemy(app)
r = redis.StrictRedis.from_url(app.config['REDIS_URL'], db=0)
