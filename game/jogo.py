from flask import Blueprint, request, render_template, session, redirect, flash, url_for
from db import db

games = Blueprint('game', __name__, template_folder="template")

@games.route('/')
def home():
    return redirect("/game", code=302)


@games.route('/game', methods=['GET'])
def carregar():
    return render_template("game.html")
