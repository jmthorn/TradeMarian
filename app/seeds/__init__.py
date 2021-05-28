from flask.cli import AppGroup
from .users import seed_users, undo_users
from .assets import seed_assets, undo_assets
from .transactions import seed_transactions, undo_transactions
from .watchlist_table import seed_watchlist_table, undo_watchlist_table
from .watchlists import seed_watchlists, undo_watchlists

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_assets()
    seed_transactions()
    seed_watchlists()
    seed_watchlist_table()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_watchlist_table()
    undo_watchlists()
    undo_users()
    undo_assets()
    undo_transactions()

    # Add other undo functions here
