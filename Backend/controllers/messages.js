// importation des modules necessaires

const models = require("../models");
const cookies = require("../middleware/authmessage");
const fs = require("fs");

// Ajout du module pour la creation d'un message

exports.createMessage = async (req, res, next) => {
  const userId = cookies.getUserId(req);
  let imageUrl;
  const content = req.body.content;
  const attachment = req.body.attachment;

  try {
    
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
    let newImageUrl = req.body.imageUrl;
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
      messageFound.update(updateMessage).then(() => {
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

// Ajout du module pour la suppression d'un message utilisateur

exports.deleteMessage = async (req, res, next) => {
  try {
    const userId = cookies.getUserId(req);
    const id = req.params.id;
    const admin = await models.Message.findOne({ where: { id: userId } });
    const messageFound = await models.Message.findOne({ where: { id } });

    if (userId === messageFound.UserId || admin.isAdmin === true) {
      if (messageFound.imageUrl) {
        const filename = messageFound.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          models.Message.destroy({ where: { id: messageFound.id } });
          res.status(200).json({
            message:
              "Votre message avec votre piece jointe a bien été supprimé !",
          });
        });
      } else {
        models.Message.destroy(
          { where: { id: messageFound.id } },
          { truncate: true }
        );
        res
          .status(200)
          .json({ message: "Votre message a bien été supprimé !" });
      }
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

// Ajout du module pour le systeme de like du message par les utilisateurs

exports.likeMessage = async (req, res, next) => {
  try {
    const userId = cookies.getUserId(req);
    const messageId = req.params.id;
    const userLiked = await models.Like.findOne({
      where: {UserId: userId, MessageId: messageId },
    });
    console.log(messageId);
    if (userLiked !== null) {
      
      await models.Like.destroy(
        { where: {  UserId:userId, MessageId:messageId } },
        { truncate: true, restartIdentity: true }
      );
      console.log({UserId:userId,MessageId: messageId });
      res
        .status(200)
        .json({
          message:
            "Votre demande de ne plus aimer se message a bien été prise en compte !",
        });
    } else {
     const createLike= await models.Like.create({
        UserId:userId,
        MessageId:messageId,
      });
      
      console.log(createLike);
      res.status(201).json({ message:createLike,reponse: "Votre like a bien été ajouté !" });}
      
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

// Ajout du module pour la création d'un commentaire

exports.createComment = async (req, res, next)=>{

try {
  const postId= req.params.id;
  const userId = cookies.getUserId(req);
  const {comment,firstname,lastname} = req.body;
  
  const newComment = {
    comments : comment,
    firstname: firstname,
    lastname: lastname,
    UserId : userId,
    PostId : postId,
  };
  models.Comment.create(newComment)
  .then((createComment)=>{
    res
  .status(201)
  .json({ createComment , messageRetour: "votre commentaire est publié" });
  })
  
  .catch((error)=>{
    res.status(400).json({error: error})
  })





} catch (error) {
  return res.status(500).send({ error: "Erreur serveur" });
}

};
