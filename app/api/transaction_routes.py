from flask import Blueprint
import requests
import os

transaction_routes = Blueprint("transactions", __name__)

stock_token = os.getenv('test_token')


@transaction_routes.route('/<ticker_symbol>')
def stock_graph_data(ticker_symbol):
    data = requests.get(
        f"https://sandbox.iexapis.com/stable/stock/{ticker_symbol}/chart/1m/?token={stock_token}&chartCloseOnly=true").json()

    print('++++++++++', data)
    closePrice = data.pop()
    closePrice = {k: v for k, v in closePrice.items() if k in ("close")}
    # print('======', closePrice)
    # stock_data = {closePrice}
    return closePrice
