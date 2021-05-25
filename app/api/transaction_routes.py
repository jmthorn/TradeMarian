from flask import Blueprint
import requests
import os

stock_routes = Blueprint("stocks", __name__)

stock_token = os.getenv('test_token')


@stock_routes.route('/<ticker_symbol>')
def stock_graph_data(ticker_symbol):
    data = requests.get(
        f"https://sandbox.iexapis.com/stable/stock/{ticker_symbol}/chart/1y/?token={stock_token}&chartCloseOnly=true").json()

    stock_data = {}

    for i in range(1, len(data)):
        stock_data[i] = {k: v for k,
                         v in data[i].items() if k in ("close", "date")}
    # print('stock data', stock_data)
    return stock_data
