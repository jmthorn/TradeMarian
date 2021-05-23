from flask import Blueprint
import requests

news_routes = Blueprint('news', __name__)

@news_routes.route('/stock/<ticker>')
def specific_news(ticker):
    reqs = requests.get(
        f"https://cloud.iexapis.com/stable/stock/{ticker}/news/?token=pk_9dfa82416e944f4e8cdec532d33129eb")

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