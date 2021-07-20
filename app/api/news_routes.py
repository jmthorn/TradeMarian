from flask import Blueprint
import requests
import os

news_routes = Blueprint('news', __name__)

# stock_token = os.environ.get('STOCK_API')
stock_news = os.environ.get('NEWS_API')


@news_routes.route('/<ticker_symbol>')
def specific_news(ticker_symbol):  # GE
    # reqs = requests.get(
    #     f"https://sandbox.iexapis.com/stable/stock/{ticker_symbol}/news/last/5?token={stock_token}")

    reqs = requests.get(
        f'https://newsapi.org/v2/everything?q={ticker_symbol}&pageSize=5&apiKey={stock_news}')

    res = reqs.json()

    # Grab the last item in res, "Articles"
    for article in res:
        news_list = res[article]
    news_ = {}

    # Normalize data - format under ID
    id = 1
    while id < len(news_list):
        for d in news_list:
            news_[id] = d
            id += 1
    return news_


@news_routes.route('/')
def all_news():
    reqs = requests.get(
        f'https://newsapi.org/v2/everything?q=stocks&pageSize=5&apiKey={stock_news}')

    res = reqs.json()

    # Grab the last item in res, "Articles"
    for article in res:
        news_list = res[article]

    news_ = {}

    # Normalize data - format under ID
    id = 1
    while id < len(news_list):
        for d in news_list:
            news_[id] = d
            id += 1

    return news_
