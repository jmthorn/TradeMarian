from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, transaction
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
    transactions = Transaction.query.filter(Transaction.user_id == userid).all()
    # print(transactions[1].asset.ticker_symbol)
    # print(transactions[1].to_dict()) #{'id': 2, 'asset_id': 2, 'share_quantity': 7, 'price_per_share': 245, 'buy_sell': True, 'created_at': datetime.datetime(2021, 5, 24, 16, 31, 50, 743094)}
    
    
    holdings = {}
    for transaction in transactions:
        if transaction.asset.ticker_symbol in holdings:
            holdings[transaction.asset.ticker_symbol] += transaction.share_quantity
        else:
            holdings[transaction.asset.ticker_symbol] = transaction.share_quantity

    print(holdings)  #{'AAPL': 5, 'MSFT': 7, 'TSLA': 10, 'SPOT': 4, 'GE': 0, 'AMZN': 3, 'DIS': 11}

    shares = {key:holdings[key] for key in holdings if holdings[key] > 0}

    print(shares) # {'AAPL': 5, 'MSFT': 7, 'TSLA': 10, 'SPOT': 4, 'AMZN': 3, 'DIS': 11}

    # History: Loop over holdings to find history per ticker_symbol 
    # {AAPL: [{date: 03-06-2021, value:"close * holding.AAPL"}, {date: 03-06-2021, value:"close * holding.AAPL"},......]}, 
    #  GOOG: [{date: 03-06-2021, value:"close * holding.GOOG"}, {date: , value: },{date: , value: }.......], }

    daterange="1m"
    symbol="AAPL"
    api_token=os.environ.get("API_TOKEN")

    history={}
    for symbol in shares.keys():

        response = requests.get(f"https://sandbox.iexapis.com/stable/stock/{symbol}/chart/{daterange}?token={api_token}&chartCloseOnly=true")
        data = response.json()
        history[symbol] = [{"date":dictionary["date"],"value":dictionary["close"]} for dictionary in data]

    print(history)


    # Porfolio: (TOTALED history) : {date:value, date:value, ........}
    # portfolio = {}
    # 
    # 
    #      
    #       
    #          
    #       
    #          

    # print({i:transactions[i].to_dict() for i in range(0, len(transactions))})
    # add up the transactions for each ticker
    # so this gives us our totals and lets us know which companies to make API
    # {user, history, portfolio}
    return {"shares":shares, "history":history}
