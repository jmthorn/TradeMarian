from flask import Blueprint
import requests
import os

stock_routes = Blueprint("stocks", __name__)

stock_token = os.getenv('STOCK_API')

@stock_routes.route('/<ticker_symbol>')
def stock_graph_data(ticker_symbol):
    reqs = requests.get(
        f"https://cloud.iexapis.com/stable/stock/{ticker_symbol}/chart/1y/?token={stock_token}&chartCloseOnly=true")

    stock_data = {}
    
    id = 0
    while id < len(reqs.json()):
        for dict_ in reqs.json():
            stock_data[id] = dict_
            id += 1
    # print('stock data', stock_data)
    return stock_data
