from flask import Blueprint
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


@transaction_routes.route('/<ticker_symbol>', methods=["POST", "GET"])
def buy_stock(transactionData):
    data = transactionData.data
    print('transactionData', transactionData)
    ticker_symbol = transactionData.ticker_symbol
    asset_id = Asset.query.filter(Asset.ticker_symbol == ticker_symbol).one()
    transaction = Transaction(
        asset_id = asset_id,
        user_id = data.user_id,
        share_quantity = data.share_quantity,
        price_per_share = data.price_per_share,
        buy_sell = data.buy_sell
    )

    db.session.add(transaction)
    db.session.commit()
    # print('==========', transaction)
    return transaction
