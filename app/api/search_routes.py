from flask import Blueprint, request
from app.models import Asset
search_routes = Blueprint("search", __name__)


@search_routes.route('/', methods=['GET', 'POST'])
def get_stocks():
    data = {}
    if request.method == 'GET':
        stocks = Asset.query.all()
        console.log('==========stock-backend', stocks.to_dict())
        new_stocks = stocks.to_dict()
        
        for stock in stocks:
            data[stock.ticker_symbol]: stock.company_name
        console.log(data,'==========data')
    # return {"stock_names": data}
    return data
