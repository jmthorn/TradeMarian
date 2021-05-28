from app.models import db, Watchlist


def seed_watchlists():
    w1 = Watchlist(
        watchlist_name="Watchlist",
        user_id=1
    )

    db.session.add(w1)
    db.session.commit()


def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY')
    db.session.commit()
