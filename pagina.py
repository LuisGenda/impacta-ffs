from flask import Blueprint, request, render_template, session, redirect, flash, url_for
from db import db
from random import randint

games = Blueprint('game', __name__, template_folder="template")

@games.route('/')
def home():
    return redirect("/game", code=302)



@games.route('/game', methods=['GET', 'POST'])
def carregar():
    if request.method == "GET":
        doc = db.collection("Palavras")
        total = doc.count().get()
        total_doc = int(str(total[0][0]).replace("value=", "").split(",")[1])

        cred = db.collection("Palavras").document(str(randint(1,total_doc))).get()
        word = cred.to_dict()
        palavra = word['word']
        dica = word['hint']
        print(palavra, dica)
        return render_template('game.html', word = palavra, hint = dica)
    else:
        return redirect("/game", code=302)