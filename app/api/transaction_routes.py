from flask import Blueprint, request
from app.models import Transaction, Asset, db
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
    # data = request.args.ticker_symbol.data
    jsonData = request.get_json()

    print('---------jsonData-', jsonData)
    ticker_symbol = jsonData['ticker_symbol']
    data = jsonData['data']

    print('data====================================================', data['user_id'])
    asset = Asset.query.filter(Asset.ticker_symbol == ticker_symbol).one()
    print('asset id', asset)
    transaction = Transaction(
        asset_id = asset.id,
        user_id = data['user_id'],
        share_quantity = data['share_quantity'],
        price_per_share = data['price_per_share'],
        buy_sell = data['buy_sell']
    )

    db.session.add(transaction)
    db.session.commit()
    print('==============transaction', transaction)
    return transaction
