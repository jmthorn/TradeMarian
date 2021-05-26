from flask import Blueprint
from flask_login import login_required, current_user
import requests

watchlist_routes = Blueprint("watchlists", __name__)


@watchlist_routes.route('/')
def get_user_watchlist():
    # watchlist =
    pass
