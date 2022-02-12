const JWT = require("jsonwebtoken");


function getUserId(req) {
    // on vérifie le userId du token
    const token = req.cookies.jwt; // on récupère le token de la requête entrante
    const decodedToken = JWT.verify(token, process.env.RANDOM_TOKEN_SECRET); // on le vérifie
    const userId = decodedToken.id;
    return userId; // on récupère l'id du token
  };

  module.exports.getUserId = getUserId;
  