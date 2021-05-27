from flask import Blueprint, request
from app.models import Asset
search_routes = Blueprint("search", __name__)


@search_routes.route('/', methods=['GET', 'POST'])
def get_stocks():
    data = {}
    stocks = Asset.query.all()
    # for stock in stocks:
    #     data[stock.ticker_symbol] = stock.company_name
    # print(data,'==========data')
    for i in range(0, len(stocks)):
        data[i] = {"ticker_symbol": stocks[i].ticker_symbol, "company_name": stocks[i].company_name}
   
    print('=========---------------------=data', data)
    return data
