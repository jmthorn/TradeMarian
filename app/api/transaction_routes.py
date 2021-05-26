from flask import Blueprint, request
from app.models import Transaction, Asset, User, db
import requests
import os
import json

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

    jsonData = request.get_json()

    ticker_symbol = jsonData['ticker_symbol']
    data = jsonData['data']

    asset = Asset.query.filter(Asset.ticker_symbol == ticker_symbol).one()

    transaction = Transaction(
        asset_id=asset.id,
        user_id=data['user_id'],
        share_quantity=data['share_quantity'],
        price_per_share=data['price_per_share'],
        buy_sell=data['buy_sell']
    )

    transaction_data = {
        'asset_id': transaction.asset_id,
        'user_id': transaction.user_id,
        'share_quantity': transaction.share_quantity,
        'price_per_share': transaction.price_per_share,
        'buy_sell': transaction.buy_sell
    }

    # user = User.query.filter(User.id == data['user_id']).one().update({'buying_power':data['buying_power']})
    # print('--------------user', user)
    db.session.add(transaction)
    # db.session.add(user)
    db.session.commit()

    return transaction_data
