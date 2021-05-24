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
    # print('hi from users')
    # print(current_user.id)
    # user = User.query.get(current_user.id)
    # print(user.to_dict())
    userid = current_user.id
    transactions = Transaction.query.filter(Transaction.user_id == userid).all()
    print({transactions[i].to_dict().id:transactions[i].to_dict() for i in range(0, len(transactions))})
    return {transactions[i].to_dict().id:transactions[i].to_dict() for i in range(0, len(transactions))}
