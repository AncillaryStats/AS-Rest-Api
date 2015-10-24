from app import r
from flask_restful import Resource, abort
from flask_restful.utils import cors
import utils
import json


class Trending_Players(Resource):
    def get(self):
        """Return trending NFL players (already in JSON format)"""
        try:
            trending = json.loads(r.get('trending_store'))
        except:
            abort(400, response={
                'status': 400,
                'message': 'Trending players not found'
            })
        else:
            return utils.success(trending)
