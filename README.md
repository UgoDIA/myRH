# myRH


 ## Installation :
- Installer un environnement virtuel dans le dossier "backend" : `py -m venv .env`
- Lancer l'environnement virtuel : `.env\Scripts\activate`
- Installer les différents modules: `pip install -r requirements.txt`
- Mettre à jour les infos de connexion db local dans myRH/settings.py
- Créer une bdd postgres avec le nom "myrh"
- Faire les migrations nécessaires : accéder au dossier src puis exécuter `py manage.py migrate`
- (optionnel) Exécuter le fichier import.py dans le dossier "data" pour remplir la base de données
- Lancer le serveur de dev avec `py manage.py runserver`
