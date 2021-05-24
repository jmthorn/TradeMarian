from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, transaction
from app.models import Transaction
from app.models import Asset
import json

user_routes = Blueprint('users', __name__)


# @user_routes.route('/')
# @login_required
# def users():
#     users = User.query.all()
#     return {"users": [user.to_dict() for user in users]}


@user_routes.route('/')
@login_required
def user():

    user = User.query.get(current_user.id).to_dict()

    userid = current_user.id
    transactions = Transaction.query.filter(Transaction.user_id == userid).all()
    print(transactions[1].asset.to_dict())
    # print({i:transactions[i].to_dict() for i in range(0, len(transactions))})
    # add up the transactions for each ticker
    # so this gives us our totals and lets us know which companies to make API
    {user, history, [aapl, ...]}
    return {i:transactions[i].to_dict() for i in range(0, len(transactions))}
