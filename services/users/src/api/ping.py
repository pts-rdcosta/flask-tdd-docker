from flask import Blueprint
from flask_restx import Api, Namespace, Resource

ping_blueprint = Blueprint("ping", __name__)
ping_namespace = Namespace("ping")
api = Api(ping_blueprint)


class Ping(Resource):
    def get(self):
        return {"status": "success", "message": "pong!"}


ping_namespace.add_resource(Ping, "")
