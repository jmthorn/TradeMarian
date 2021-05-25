from flask import Blueprint
from app.models import Transaction, Asset
import requests
import os

transaction_routes = Blueprint("transactions", __name__)

stock_token = os.getenv('test_token')


@transaction_routes.route('/<ticker_symbol>')
def stock_graph_data(ticker_symbol):
    data = requests.get(
        f"https://sandbox.iexapis.com/stable/stock/{ticker_symbol}/chart/1m/?token={stock_token}&chartCloseOnly=true").json()

    closePrice = data.pop()
    closePrice = {k: v for k, v in closePrice.items() if k in ("close")}

    return closePrice


@transaction_routes.route('/<ticker_symbol>', methods=["POST"])
def buy_stock(ticker_symbol):
    asset_id = Asset.query.filter_by(ticker_symbol=ticker_symbol)
    print('==========', asset_id)
    return asset_id
