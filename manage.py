from flask.cli import FlaskGroup
from src import create_app, db
from src.api.models import User # Used to create empty table from Model if skipped then does not create the table in the DB


app = create_app()

cli = FlaskGroup(create_app=app)

# cli = FlaskGroup(create_app=create_app)

cli = FlaskGroup(app)


@cli.command('recreate_db')
def recreate_db():

    print("Creating DB")

    db.drop_all()
    db.create_all()
    db.session.commit()
    
@cli.command('seed_db')
def seed_db():
    db.session.add(User(username='michael', email="hermanmu@gmail.com"))
    db.session.add(User(username='michaelherman', email="michael@mherman.org"))
    db.session.commit()



if __name__ == '__main__':
    cli()
