from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine.url import URL

import settings

Base = declarative_base()

def db_connect():
    """
    Performs database connection using database settings from settings.py
    Returns sqlalchemy engine instance
    """
    return create_engine(URL(**settings.DATABASE))

def create_tables(engine):
    Base.metadata.create_all(engine)

class NFL_Team_2015(Base):
    """2015 NFL teams table"""
    __tablename__ = 'nfl_teams_2015'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    division = Column(String)