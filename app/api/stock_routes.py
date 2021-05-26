from flask import Blueprint
import requests
import os
from app.models import Asset

stock_routes = Blueprint("stocks", __name__)

stock_token = os.getenv('test_token')

@stock_routes.route('/<ticker_symbol>')
def stock_graph_data(ticker_symbol):
    data = requests.get(
        f"https://sandbox.iexapis.com/stable/stock/{ticker_symbol}/chart/1y/?token={stock_token}&chartCloseOnly=true").json()
    
    # print('========data', data) # [ {'date': '2021-02-16', 'close': 133.36}, {}, {}...]
    asset = Asset.query.filter(Asset.ticker_symbol == ticker_symbol).one() #<Asset one>
    stock_info = {
        "ticker_symbol":asset.ticker_symbol,
        "description":asset.description,
        "ceo": asset.ceo,
        "employees": asset.employees,
        "headquarters": asset.headquarters,
        "founded": asset.founded,
        "market_cap": asset.market_cap,
        "price_earning_ratio": asset.price_earning_ratio,
        "dividend_yield": asset.dividend_yield,
        "average_volume": asset.average_volume
    }

    print(stock_info, 'stock-infooooooooooooooooo')
    stock_data = {}
    for i in range(0, len(data)):
        close = ""
        date = ""
        for key, value in data[i].items():
            if key == "close":
                close = value
            if key == "date":
                date = value
            stock_data[date] = close

    stock_data_list = [{"date":key, "price": value} for (key, value) in stock_data.items()]
     
    # for i in range(1, len(data)):
    #     stock_data[i] = {k: v for k, v in data[i].items() if k in ("close", "date")}

    return {"stock_info": stock_info, "stock_data": stock_data_list}
