from flask import Blueprint, request
from flask_login import login_required, current_user
import requests
from app.models import Watchlist
from app.models import Asset
from app.models import db

watchlist_routes = Blueprint("watchlists", __name__)

""" Watchlists - get user's watchlists
               - create a new watchlist for user """


@watchlist_routes.route('/', methods=['GET', 'POST'])
@login_required
def get_user_watchlist():
    user_id = current_user.id
    # create new watchlist
    if request.method == 'POST':
        # {'watchlist_name': {'watchlist_name': '12345356431', 'user': 1}}
        json_data = request.get_json()
        watchlist_name = json_data['watchlist_name']['watchlist_name']

        # print('backeeeeeeeeend', watchlist_name)

        new_watchlist = Watchlist(
            watchlist_name=watchlist_name,
            user_id=user_id
        )

        db.session.add(new_watchlist)
        db.session.commit()

        watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()

        # for each watchlist grab assets
        # hand back {watchlists :[ {watchlist: { id: 1, user_id: 1, watchlist_name: "list1", assets: [{asset1}, {asset2}]}},
        #                          {watchlist: { id: 2, user_id: 1, watchlist_name: "list2", assets: [{asset1}]}}]}
        watchlists_dict = {}
        for watchlist in watchlists:
            # watchlist = {'id': 1, 'watchlist_name': 'Watchlist', 'user_id': 1}
            dict_assets = []
            for asset in watchlist.assets:
                dict_assets.append(asset.to_dict())

            watchlists_dict[watchlist.id] = {
                "watchlist": watchlist.to_dict(), "assets": dict_assets}
            # {1: {'watchlist': <Watchlist 1>, 'assets': [<Asset 15>, <Asset 16>, <Asset 17>, <Asset 18>, <Asset 19>, <Asset 20>]}}
        return watchlists_dict

    else:
        watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()

        # for each watchlist grab assets
        # hand back {watchlists :[ {watchlist: { id: 1, user_id: 1, watchlist_name: "list1", assets: [{asset1}, {asset2}]}},
        #                          {watchlist: { id: 2, user_id: 1, watchlist_name: "list2", assets: [{asset1}]}}]}
        watchlists_dict = {}
        for watchlist in watchlists:
            # watchlist = {'id': 1, 'watchlist_name': 'Watchlist', 'user_id': 1}
            dict_assets = []
            for asset in watchlist.assets:
                dict_assets.append(asset.to_dict())

            watchlists_dict[watchlist.id] = {
                "watchlist": watchlist.to_dict(), "assets": dict_assets}
            # {1: {'watchlist': <Watchlist 1>, 'assets': [<Asset 15>, <Asset 16>, <Asset 17>, <Asset 18>, <Asset 19>, <Asset 20>]}}
        return watchlists_dict


""" Delete watchlist - remove an entire watchlist from a user's watchlists
 *** only available after demo has created a new list so as to not delete default list?
 *** handle this on front end by not having a delete button  """


@watchlist_routes.route('/<watchlistId>', methods=['DELETE'])
@login_required
def delete_user_watchlist(watchlistId):
    watchlist_to_delete = Watchlist.query.get(watchlistId)
    db.session.delete(watchlist_to_delete)
    db.session.commit()
    return watchlist_to_delete.to_dict()


""" Update watchlist - remove single asset from a given watchlist
"""


@watchlist_routes.route('/<watchlistId>/<assetId>', methods=["DELETE"])
@login_required
def delete_asset_in_watchlist(watchlistId, assetId):
    """ remove the watchlist from the Asset's watchlists """
    print('watchlistId', watchlistId)
    print('assetId', assetId)
    asset_to_be_removed = Asset.query.get(assetId)
    # print('AAAAAAAAAA', asset_to_be_removed)
    watchlist = Watchlist.query.get(watchlistId)
    asset_to_be_removed.watchlists.remove(watchlist)

    #  update?
    db.session.add(asset_to_be_removed)
    db.session.commit()

    res = asset_to_be_removed.to_dict()
    return res


""" Update watchlist - add asset to given watchlist
"""


# @login_required
@watchlist_routes.route('/<watchlistId>/<assetId>', methods=["POST"])
def add_asset(watchlistId, assetId):
    asset_to_add = Asset.query.get(assetId)

    watchlist = Watchlist.query.get(watchlistId)
    watchlist.assets.append(asset_to_add)

    db.session.add(asset_to_add)
    db.session.commit()

    res = asset_to_add.to_dict()

    return res
