// Importation du framework EXPRESS pour la creation de l'API
const express = require("express");

// Import du dotenv pour les variables d'environnement
require('dotenv').config();

// Création de l' apllication EXPRESS
const app = express();

app.use(express.json());

// Configuration des CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.status(200).send('<h1>Bienvenue sur mon serveur !</h1>');
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    
    next();
  });



  module.exports = app;