from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User
from app.models import Transaction
from app.models import Asset
import json
import requests
import os

user_routes = Blueprint('users', __name__)


# @user_routes.route('/')
# @login_required
# def users():
#     users = User.query.all()
#     return {"users": [user.to_dict() for user in users]}


@user_routes.route('/')
@login_required
def user():

    # Current user
    user = User.query.get(current_user.id).to_dict()

    # Holdings: We need total stocks owned by current_user in format: { AAPL:30, GOOG:25, SRP:14}
    userid = current_user.id
    transactions = Transaction.query.filter(
        Transaction.user_id == userid).all()
    # print(transactions[1].asset.ticker_symbol)
    # print(transactions[1].to_dict()) #{'id': 2, 'asset_id': 2, 'share_quantity': 7, 'price_per_share': 245, 'buy_sell': True, 'created_at': datetime.datetime(2021, 5, 24, 16, 31, 50, 743094)}

    holdings = {}
    for transaction in transactions:
        if transaction.assets.ticker_symbol in holdings:
            holdings[transaction.assets.ticker_symbol] += transaction.share_quantity
        else:
            holdings[transaction.assets.ticker_symbol] = transaction.share_quantity

    # print(holdings)  #{'AAPL': 5, 'MSFT': 7, 'TSLA': 10, 'SPOT': 4, 'GE': 0, 'AMZN': 3, 'DIS': 11}

    shares = {key: holdings[key] for key in holdings if holdings[key] > 0}

    # print(shares) # {'AAPL': 5, 'MSFT': 7, 'TSLA': 10, 'SPOT': 4, 'AMZN': 3, 'DIS': 11}

    # History: Loop over holdings to find history per ticker_symbol
    # {AAPL: [{date: 03-06-2021, value:"close * holding.AAPL"}, {date: 03-06-2021, value:"close * holding.AAPL"},......]},
    #  GOOG: [{date: 03-06-2021, value:"close * holding.GOOG"}, {date: , value: },{date: , value: }.......], }

    daterange = "1y"
    api_token = os.environ.get("STOCK_API")
    history = {}

    for symbol in shares.keys():

        response = requests.get(
            f"https://sandbox.iexapis.com/stable/stock/{symbol}/chart/{daterange}?token={api_token}&chartCloseOnly=true")
        data = response.json()
        history[symbol] = [{"date": dictionary["date"],
                            "value":dictionary["close"]} for dictionary in data]

    # Porfolio: (TOTALED history) : {date:value, date:value, ........}

    equity = {}  # symbol: (trans.price_per_share*shares)-(shares*close)
    # total: price_per_share * shares  +  price_per_share * shares  - (frontend #)
    totalCost = 0
    for symbol in history:
        asset = Asset.query.filter(Asset.ticker_symbol == symbol).one()
        trans = Transaction.query.filter(Transaction.user_id == userid).filter(
            Transaction.asset_id == asset.id).first()
        totalCost += trans.price_per_share * shares[symbol]
        equity[symbol] = (history[symbol][len(history[symbol]) - 1]['value']
                          * shares[symbol]) - (trans.price_per_share * shares[symbol])

    print('equity-------', equity)

    obj = {}
    for i in range(len(list(history.values())[0])):
        for key, stock in history.items():
            key_value = stock[i]
            date = key_value['date']
            value = key_value['value'] * shares[key]
            if date in obj:
                obj[str(date)] += value
            else:
                obj[str(date)] = value

     # OBJ.......... {'2021-04-26': 23848.579999999998, '2021-04-27': 23335.850000000002, '2021-04-28': 23114.54, '2021-04-29': 23323.47, '2021-04-30': 23661.219999999998, '2021-05-03': 23368.44, '2021-05-04': 22340.160000000003, '2021-05-05': 22201.1, '2021-05-06': 22154.629999999997, '2021-05-07': 22521.329999999998, '2021-05-10': 21612.950000000004, '2021-05-11': 21525.390000000003, '2021-05-12': 21137.4, '2021-05-13': 21149.949999999997, '2021-05-14': 21515.190000000002, '2021-05-17': 21246.09, '2021-05-18': 21215.46, '2021-05-19': 20702.030000000002, '2021-05-20': 21434.84, '2021-05-21': 20904.72, '2021-05-24': 21621.379999999997}
    # [{'date':'2021-04-26', "value":23848.579999999998}]

    portfolio_data = [{"date": key, "value": value}
                      for (key, value) in obj.items()]

    return {"shares": shares, "history": history, "portfolio_data": portfolio_data, "equity": equity, "totalCost": totalCost}
