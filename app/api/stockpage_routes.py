from flask import Blueprint
import requests
import os

stock_routes = Blueprint("stock", __name__)

stock_token = os.environ.get('STOCK_API')


@stock_routes.route('/stocks/<ticker_symbol>')
def stock_data(ticker_symbol):
    reqs = requests.get(
        f"https://cloud.iexapis.com/stable/stock/aapl/chart/1m/?token={stock_token}")

    print(reqs.content)

    # return
