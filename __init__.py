from flask import Flask
from game.jogo import games

def create_app():
    app = Flask(__name__)
    app.secret_key = "froca123"
    app.config['MAX_CONTENT_LENGTH'] = 10000000
    # app.config["SESSION_COOKIE_SAMESITE"] = "None"


    app.register_blueprint(games, url_prefix="/")

    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='localhost', debug=True)
