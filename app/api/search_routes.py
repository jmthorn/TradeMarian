from flask import Blueprint
from app.models import Asset

search_routes = Blueprint("search", __name__)


@search_routes.route('/<ticker_symbol>')
def get_stocks(ticker_symbol):
    stock_name = Asset.query.filter()
