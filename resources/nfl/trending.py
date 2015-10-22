from app import r
from flask_restful import Resource
from flask_restful.utils import cors
import utils


class Trending_Players(Resource):
    @cors.crossdomain(origin='*')
    def get(self):
        """Return trending NFL players (already in JSON format)"""
        return r.get('trending_store')

