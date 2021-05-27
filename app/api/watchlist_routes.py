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
    if request.get_json():
        json_data = request.get_json()
        watchlist_name = json_data.watchlist_name

        new_watchlist = Watchlist(
            watchlist_name=watchlist_name,
            user_id=user_id
        )
        db.session.add(new_watchlist)
        db.session.commit()

    watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()

    return watchlists.to_dict()


""" Delete watchlist - remove an entire watchlist from a user's watchlists
 *** only available after demo has created a new list so as to not delete default list?
 *** handle this on front end by not having a delete button  """
@watchlist_routes.route('/<watchlistId>', methods=['DELETE'])
@login_required
def delete_user_watchlist(watchlistId):
    watchlist_to_delete = Watchlist.query.get(watchlistId)
    db.session.delete(watchlist_to_delete)
    db.session.commit()
    return "delete sucessful"


""" Update watchlist - remove single asset from a given watchlist
"""
@watchlist_routes.route('/<watchlistId>/<assetId>', methods=["DELETE"])
@login_required
def delete_asset_in_watchlist(watchlistId, assetId):
    """ remove the watchlist from the Asset's watchlists """
    asset_to_be_removed = Asset.query.get(assetId)
    asset_to_be_removed.watchlists.remove(Watchlist.query.get(watchlistId))

    #  update?
    db.session.update(asset_to_be_removed)
    db.session.commit()
    return "update sucessful"


""" Update watchlist - add asset to given watchlist
"""
@watchlist_routes.route('/<watchlistId>/<assetId>', methods=["POST"])
@login_required
def add_asset(watchlistId, assetId):
    asset_to_add = Asset.query.get(assetId)
    Watchlist.query.get(watchlistId).append(asset_to_add)

    #  update?
    db.session.update(asset_to_add)
    db.session.commit()
    return "update successful"
