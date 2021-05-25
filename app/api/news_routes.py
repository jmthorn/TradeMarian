from flask import Blueprint
import requests

news_routes = Blueprint('news', __name__)

stock_token = os.environ.get('STOCK_API')
stock_news = os.environ.get('All_NEWS_API')


@news_routes.route('/stock/<ticker_symbol>')
def specific_news(ticker_symbol):
    reqs = requests.get(
        f"https://cloud.iexapis.com/stable/stock/{ticker_symbol}/news/?token={stock_token}")

    list_ = {}

    id = 1
    while id < len(reqs.json()):
        for dict_ in reqs.json():
            list_[id] = dict_
            id += 1

    return list_


@news_routes.route('/news')
def all_news():
    reqs = requests.get(
        "https://newsapi.org/v2/everything?q=stocks&apiKey=b5d1f835466045a19d46216f6729c833")

    res = reqs.json()

    for article in res:
        news_list = res[article]

    news_ = {}

    id = 1
    while id < len(news_list):
        for d in news_list:
            news_[id] = d
            id += 1

    return news_
