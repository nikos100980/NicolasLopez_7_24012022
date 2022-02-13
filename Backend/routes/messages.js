// ------------------------------------------------Les routes necessaires aux messages---------------------------------------------------

const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// importation du module controller message
const messageCtrl = require('../controllers/messages');
// Creation de la route pour la creation , en lui passant toujours l'authentification 
router.post('/messages/new/',auth,multer,messageCtrl.createMessage);
router.get('/messages',messageCtrl.getMessages);
router.get('/messages/:id',messageCtrl.getOneMessage);
router.put('/messages/:id',auth,multer,messageCtrl.updateMessage);
router.delete('/messages/:id',auth,multer,messageCtrl.deleteMessage);

// Creation de la route pour le like

router.post('/messages/:id/likes',auth,messageCtrl.likeMessage);

// Creation des routes pour les commentaires

router.post('/messages/:id/comments',auth,messageCtrl.createComment);








module.exports = router;