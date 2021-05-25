from app.models import db, Transaction


def seed_transactions():
    t1 = Transaction(
        asset_id = 1,
        user_id = 1,
        share_quantity = 5,
        price_per_share = 125.30,
        buy_sell = True
    )

    t2 = Transaction(
        asset_id = 2,
        user_id = 1,
        share_quantity = 7,
        price_per_share = 244.98,
        buy_sell = True
    )
    t3 = Transaction(
        asset_id = 3,
        user_id = 1,
        share_quantity = 10,
        price_per_share = 578.99,
        buy_sell = True
    )
    t4 = Transaction(
        asset_id = 4,
        user_id = 1,
        share_quantity = 4,
        price_per_share = 229.14,
        buy_sell = True
    )
    t5 = Transaction(
        asset_id = 5,
        user_id = 1,
        share_quantity = 2,
        price_per_share = 3201.00,
        buy_sell = True
    )
    t6 = Transaction(
        asset_id = 6,
        user_id = 1,
        share_quantity = 3,
        price_per_share = 172.40,
        buy_sell = True
    )
    t7 = Transaction(
        asset_id = 7,
        user_id = 1,
        share_quantity = 11,
        price_per_share = 110.99,
        buy_sell = True
    )
    t8 = Transaction(
        asset_id = 7,
        user_id = 1,
        share_quantity = -11,
        price_per_share = 110.99,
        buy_sell = False
    )
    t9 = Transaction(
        asset_id = 5,
        user_id = 1,
        share_quantity = 4,
        price_per_share = 3210.00,
        buy_sell = True
    )

    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.add(t6)
    db.session.add(t7)
    db.session.add(t8)
    db.session.add(t9)
    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY')
    db.session.commit()
