// importation des modules necessaires

const models = require("../models");
const cookies = require("../middleware/authmessage");
const fs = require("fs");

// Ajout du module pour la creation d'un message

exports.createMessage = async (req, res, next) => {
  const userId = cookies.getUserId(req);

  const content = req.body.content;
  const attachment = req.body.attachment;
  let imageUrl;

  try {
    await models.User.findOne({
      where: { id: userId },
    })
      .then( async (userFound) => {
        if (userFound) {
          if (req.file) {
            imageUrl = `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`;
          } else {
            imageUrl = null;
          };

          const message = await models.Message.create({
            content: content,
            attachment: attachment,
            likes: 0,
            UserId: userFound.id,
          });
          res.status(201).json({
            message: message,
            reponse: "Votre message a bien été posté !",
          });
        } else {
          res.status(500).json({ message: "ça bloque" });
        }
      })
      .catch((error) => {
        return res.status(500).json({ error: error });
      });
  } catch (error)
  {return res.status(500).send({ error: "Erreur serveur" });}
};

// Ajout du module pour récuperer l'ensemble des messages utilisateurs 

exports.getMessages = (req,res,next)=>{


    
}
