from .db import db


# asset can have many transactions
# user can have many transactions

class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key = True)
    asset_id = db.Column(db.Integer, db.ForeignKey("assets.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    share_quantity = db.Column(db.Integer, nullable=False)
    price_per_share = db.Column(db.Integer, nullable=False)
    # buy = true, sell = false
    buy_sell = db.Column(db.Boolean, nullable=False)

    asset = db.relationship("Asset", back_populates="transactions")
    user = db.relationship("User", back_populates="transactions")

    def to_dict(self):
        return {
            "id": self.id,
            "asset_id": self.asset_id,
            "share_quantity": self.share_quantity,
            "price_per_share": self.price_per_share,
            "buy_sell": self.buy_sell,
        }
