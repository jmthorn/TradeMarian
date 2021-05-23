from .db import db

class Asset(db.Model):
    __tablename__ = 'assets'

    id = db.Column(db.Integer, primary_key = True)
    company_name = db.Column(db.String(100), nullable=False)
    ticker_symbol = db.Column(db.String(10), nullable=False, unique=True)
    description = db.Column(db.String, nullable=False)
    ceo = db.Column(db.String, nullable=False)
    employees = db.Column(db.Integer, nullable=False)
    headquarters = db.Column(db.String, nullable=False)
    founded = db.Column(db.Integer, nullable=False)
    market_cap = db.Column(db.Integer, nullable=False)
    price_earning_ratio = db.Column(db.Integer, nullable=False)
    dividend_yield = db.Column(db.Integer, nullable=False)
    average_volume = db.Column(db.Integer, nullable=False)


    def to_dict(self):
        return {
            "id": self.id,
            "company_name": self.company_name,
            "ticker_symbol": self.ticker_symbol,
            "description": self.description,
            "ceo": self.ceo,
            "employees": self.employees,
            "headquarters": self.headquarters,
            "founded": self.founded,
            "market_cap": self.market_cap,
            "price_earning_ratio": self.price_earning_ratio,
            "dividend_yield": self.dividend_yield,
            "average_volume": self.average_volume
        }
