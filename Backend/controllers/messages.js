// importation des modules necessaires

const models = require("../models");
const cookies = require("../middleware/authmessage");
const fs = require("fs");

// Ajout du module pour la creation d'un message

exports.createMessage = async (req, res, next) => {
  const userId = cookies.getUserId(req);

  const content = req.body.content;
  const attachment = req.body.attachment;

  try {
    let imageUrl;
    await models.User.findOne({
      where: { id: userId },
    })
      .then(async (userFound) => {
        if (userFound) {
          if (req.file) {
            imageUrl = `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`;
          } else {
            imageUrl = null;
          }

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
        res.status(500).json({ error: error });
      });
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

// Ajout du module pour récuperer l'ensemble des messages utilisateurs avec un ORDER descandant pour afficher les derniers messages en premier

exports.getMessages = async (req, res, next) => {
  try {
    await models.Message.findAll({
      attributes: ["id", "content", "attachment", "likes", "imageUrl"],
      order: [["id", "DESC"]],
      include: [
        {
          model: models.User,
          attributes: ["firstname", "lastname", "picture"],
        },
        {
          model: models.Comment,
          attributes: ["comments", "UserId", "id"],
          order: [["id", "DESC"]],
          include: [
            {
              model: models.User,
              attributes: ["picture", "lastname", "firstname"],
            },
          ],
        },
      ],
    })
      .then((messages) => {
        if (messages) {
          res.status(200).json(messages);
        } else {
          res.status(404).json({ error: "aucun message trouvé" });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

// Ajout du module pour récuperer un message d'un utilisateur

exports.getOneMessage = async (req, res, next) => {
  try {
    await models.Message.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: models.User,
          attributes: ["id", "lastname", "firstname", "picture"],
        },
        {
          model: models.Comment,
          order: [["id", "DESC"]],
          attributes: ["comments", "UserId"],
          includes: [
            {
              model: models.User,
              attributes: ["picture", "lastname", "firstname"],
            },
          ],
        },
      ],
    })
      .then((message) => {
        if (message) {
          res.status(200).json(message);
        } else {
          res
            .status(404)
            .json({ error: "Le message selectionné n'a paqs été trouvé !" });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

// Ajout du module permettant la mise a jour d'un message utilisateur

exports.updateMessage = async (req, res, next) => {
  try {
    const userId = cookies.getUserId(req);
    const id = req.params.id;
    let newImageUrl= req.body.imageUrl;
    const content = req.body.content;
    const attachment = req.body.attachment;
    const messageFound = await models.Message.findOne({ where: { id: id } });

    if (userId === messageFound.UserId) {
      if (req.file) {
        newImageUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
        if (messageFound.imageUrl) {
          const filename = messageFound.imageUrl.split("/images")[1];
          fs.unlink(`images/${filename}`, (err) => {
            if (err) console.log(err);
            else {
              console.log(`Deleted file: images/${filename}`);
            }
          });
        }
      }
      const updateMessage = {
        content: content,
        attachment: attachment,
        imageUrl: newImageUrl,
      };
      messageFound.update(updateMessage)
      .then(() => {
        console.log(updateMessage);
        res.status(200).json({ message: "Votre message a bien été modifié !" });
      });
    } else {
      res.status(400).json({
        message:
          "Vous ne pouvez pas modifier ce message, veuillez contacter votre administrateur !",
      });
    }
  } catch (error) {
    return res.status(500).send({ error: " Erreur serveur" });
  }
};
