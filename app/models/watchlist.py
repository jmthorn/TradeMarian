from .db import db
from .asset import watchlist_table


class Watchlist(db.Model):
    __tablename__ = "watchlists"

    id = db.Column(db.Integer, primary_key=True)
    watchlist_name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="watchlists")
    assets = db.relationship(
        "Asset", secondary=watchlist_table, back_populates="watchlists")

    def to_dict(self):
        return {
            "id": self.id,
            "watchlist_name": self.watchlist_name,
            "user_id": self.user_id
        }
