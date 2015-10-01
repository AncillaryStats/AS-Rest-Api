import os
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import routes

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
db = SQLAlchemy(app)


if __name__ == '__main__':
    app.run();
