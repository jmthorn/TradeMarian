from app.models import db, Watchlist, Asset


def seed_watchlist_table():

    # demo user's list
    watchlist_1 = Watchlist.query.filter(Watchlist.user_id == 1).first()
    asset_15 = Asset.query.get(15)
    watchlist_1.assets.append(asset_15)

    asset_16 = Asset.query.get(16)
    watchlist_1.assets.append(asset_16)

    asset_17 = Asset.query.get(17)
    watchlist_1.assets.append(asset_17)

    asset_18 = Asset.query.get(18)
    watchlist_1.assets.append(asset_18)

    asset_19 = Asset.query.get(19)
    watchlist_1.assets.append(asset_19)

    asset_20 = Asset.query.get(20)
    watchlist_1.assets.append(asset_20)

    db.session.add(watchlist_1)
    db.session.commit()


def undo_watchlist_table():
    db.session.execute('TRUNCATE watchlist_table RESTART IDENTITY CASCADE')
    db.session.commit()
