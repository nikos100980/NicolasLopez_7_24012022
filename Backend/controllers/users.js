// --------------------------------------------------------------Le controller utilisateur------------------------------------------------------

// Importation du module BCRYPT afin d'utiliser la methode HASh pour le password et ainsi sécuriser cette donnée ultra sensible ( recommandation OWASP)
const bcrypt = require("bcrypt");
const models = require('../models');


// Importation du module JSONWEBTOKEN pour s'assurer que l'utilisateur est bien le même sur l'ensemble du parcours utilisateur, il sera authentifié sur chaque route
const jwt = require("jsonwebtoken");

// Importation du module crypto js afin de l'utiliser dans le cadre des recommandations RGPD pour le masquage des données sensibles ( en l'occurence là l'email)
const cryptoJs = require("crypto-js");

// Le controller permettant la création d'un utilisateur avec le hash du mot de passe afin de sécuriser l'accés et les données confidentielles
exports.signup = (req, res, next) => {
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;
  const picture = req.body.picture;
  const bio = req.body.bio;

  if (
    email != null ||
    firstname != null ||
    lastname != null ||
    password != null
  ) {
    return res
      .status(400)
      .json({ error: "Merci de renseigner les champs obligatoires" });
  }
  models.User.findOne({
    attributes: ["email"],
    where: { email: email }
  })
    .then((userFound) => {
      if (!userFound) {
        const emailCrypto = cryptoJs
          .HmacSHA256(email, `${process.env.CRYPTO_EMAIL}`)
          .toString();
        bcrypt
          .hash(password, 10,(err,hash)=>{
            const newUser = models.User.create({
                email: emailCrypto,
                password: hash,
                firstname: firstname,
                lastname: lastname,
                bio: bio,
                picture: picture,
                isAdmin: 0
            })
                
                .then(function (newUser) {
                        return res.status(201).json({ 'userId': newUser.id });
                    })
                
                .catch((err) => res.status(500).json({ error }));
            })
          
           
            
      } else {
        return res
          .status(409)
          .json({ error: `L'utilisateur est deja inscrit avec cet email ! ` });
      }
    })
    .catch((err) =>
      res.status(500).json({ error: "Utilisateur impossible à verifier !" })
    );
};

// Le controller de connection incluant le token afin de lier systematiquement notre utilisateur sur l'ensemble du parcours
exports.login = (req, res, next) => {
  const emailCrypto = cryptoJs
    .HmacSHA256(req.body.email, `${process.env.CRYPTO_EMAIL}`)
    .toString();
  User.findOne({ email: emailCrypto })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              `${process.env.RANDOM_TOKEN_SECRET}`,
              {
                expiresIn: "2h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) =>
      res.status(500).json({ error: `impossible de verifier l'utilisateur !` })
    );
};
