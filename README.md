# GROUPOMANIA SOCIAL NETWORK

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.

## Pour commencer

L'application a plusieurs fonctionnalitées :
- Inscription / Connexion / Déconnexion
- Suppression de son compte
- Affichage des posts de tous les utilisateurs
- Possibilité de commenter et liker les posts
- Poster des posts avec des messages et des images
- L'administrateur peut supprimer les posts, les commentaires et les utilisateurs souhaités



### Installation


## Backend

Ouvrir le terminal et se positionner dans le dossier backend

```bash
cd Backend
```

puis installer l'ensemble du package.json

```bash
npm install
```

pour finir lancer le serveur

```bash
nodemon server
```
## Frontend

Ouvrir le terminal et se positionner dans le dossier frontend

```bash
cd groupomania
```

puis installer tout le package.json

```bash
npm install
```

pour finir lancer le serveur

```bash
npm start
```
## Base de données

Se connecter au serveur MySql de votre choix. Exécuter la commande: CREATE DATABASE `database_development`.
Les identifiants de connection à la bdd se trouvent dans le dossier `config` du dossier `Backend`.
Ensuite il faudra importer le fichier sql de la database qui se trouve être le livrable 2 .


## Fabriqué avec

* [React](https://reactjs.org/) pour la partie Front-end
* [Express](https://expressjs.com/fr/) pour la partie back-end
* [SASS](https://sass-lang.com/) pour le framework CSS (front)
* [Vscode](https://code.visualstudio.com/) comme éditeur de texte

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)


