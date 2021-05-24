from flask import Blueprint
import requests
from .env import test_token

stock_routes = Blueprint("stock", __name__)

reqs = requests.get(
    f"https://sandbox.iexapis.com/stable/stock/aapl/company?token={test_token}")

print(reqs.content)


# @stock_routes.route('/stocks/<ticker_symbol>')
# def stock_data(ticker_symbol):
#     reqs = requests.get(
#         f"https://sandbox.iexapis.com/stable/stock/{ticker_symbol}/company?token={test_token}")

#     print(reqs.content)

#     # return
