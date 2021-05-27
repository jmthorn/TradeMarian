from flask import Blueprint
from app.models import Asset

search_routes = Blueprint("search", __name__)


@search_routes.route('/<search_string>')
def get_stocks(search_string):
    stock_name = Asset.query.all()
    print(stock_name)

    return {stock_name}
