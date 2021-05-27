from flask import Blueprint
from app.models import Asset

search_routes = Blueprint("search", __name__)


@search_routes.route('/<search_string>')
def get_stocks(search_string):
    stock_name = Asset.query.filter(Asset.ticker_symbol == search_string).one()
    print(stock_name)

    return {stock_name}
