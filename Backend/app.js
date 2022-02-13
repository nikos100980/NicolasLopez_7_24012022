// Importation du framework EXPRESS pour la creation de l'API
const express = require("express");
const path = require('path');

const cookieParser = require('cookie-parser');

//db
const { sequelize } = require('./models/index');

// Import du dotenv pour les variables d'environnement
require("dotenv").config();

// Création de l' apllication EXPRESS
const app = express();

const userRoutes = require("./routes/users");
const messageRoutes = require('./routes/messages');

// parse application/json

app.use(express.json());
// parse application/x-www-form-urlencoded


app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
// Configuration des CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});
app.use("./images", express.static(path.join(__dirname, "./images")));
app.use("/api/auth", userRoutes);
app.use('/api/',messageRoutes);




const dbTest = async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
dbTest();

module.exports = app;
