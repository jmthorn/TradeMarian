from flask import Blueprint
import requests
import os

stock_routes = Blueprint("stocks", __name__)

stock_token = os.environ.get('STOCK_API')


@stock_routes.route('/<:ticker_symbol>')
def stock_data(ticker_symbol):
    reqs = requests.get(
        f"https://cloud.iexapis.com/stable/stock/{ticker_symbol}/chart/1m/?token={stock_token}")

    stock_data_list_ = {}

    id = 1
    while id < len(reqs.json()):
        for dict_ in reqs.json():
            stock_data_list_[id] = dict_
            id += 1

    print('test ---------', stock_data_list_)

    return stock_data_list_
