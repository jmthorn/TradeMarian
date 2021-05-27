from flask import Blueprint

search_routes = Blueprint("search", __name__)


@search_routes.route('/')
def get_stocks():
    pass
