from flask import Blueprint, request
from app.models import Asset
search_routes = Blueprint("search", __name__)


@search_routes.route('/', methods=['GET', 'POST'])
def get_stocks():
    data = {}
    stocks = Asset.query.all()
    
    # this way to get stocks or second way uncommented
    # for stock in stocks:
    #     data[stock.ticker_symbol] = stock.company_name
    # print(data,'==========data') 
    # data will = {'AAPL': 'Apple', 'MSFT': 'Microsoft', 'TSLA': 'Tesla',

    for i in range(0, len(stocks)):
        data[i] = {"ticker_symbol": stocks[i].ticker_symbol, "company_name": stocks[i].company_name}
   
    print('=========---------------------=data', data)
    # data will = {0: {'ticker_symbol': 'AAPL', 'company_name': 'Apple'}, 1: {'ticker_symbol': 'MSFT', 'company_name': 'Microsoft'}, 2: {'ticker_symbol': 'TSLA', 'company_name': 'Tesla'}
    return data
