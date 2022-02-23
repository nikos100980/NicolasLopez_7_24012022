// Importation du framework EXPRESS pour la creation de l'API
const express = require("express");
const path = require("path");

const authCookie = require("./middleware/authCookie");

const cookieParser = require("cookie-parser");

//db
const { sequelize } = require("./models/index");

// Import du dotenv pour les variables d'environnement
require("dotenv").config();

// importation du module de sécurité pour les en-têtes HTTP afin proteger certaines vulnerabilités de l'API
const helmet = require("helmet");

// Création de l' apllication EXPRESS
const app = express();

const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");

// parse application/json

app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
// Configuration des CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use("./images", express.static(path.join(__dirname, "./images")));
app.use("/api/auth", userRoutes);
app.use("/api/", messageRoutes);

// Création d'une route specifique pour le cookie
app.get("/jwtid", authCookie, ( req, res) => {
  

    
    res.status(200).send(res.locals.user);
  
});

const dbTest = async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
dbTest();

module.exports = app;
