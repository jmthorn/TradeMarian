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