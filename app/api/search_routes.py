from flask import Blueprint
from app.models import Asset

search_routes = Blueprint("search", __name__)


@search_routes.route('/')
def get_stocks():
    stocks = Asset.query.all()
    console.log('==========stock-backend', stocks.to_dict())
    new_stocks = stocks.to_dict()
    data = {}
    for stock in stocks:
        data[stock.ticker_symbol]: stock.company_name
    console.log(data,'==========data')
    # return {"stock_names": data}
    return new_stocks
