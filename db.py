import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("impacta-ffs/forca-key.json")
firebase_admin.initialize_app(cred)


db = firestore.client()

# cred = db.collection("Palavras")
# total = cred.count().get()
# total = int(str(total[0][0]).replace("value=", "").split(",")[1])
# print(total)

# word = cred.to_dict()
# palava = word['word']
# dica = word['hint']
# lista = [palava, dica]
# print(lista)
