// ------------------------------------------------Les routes necessaires aux messages---------------------------------------------------

const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// importation du module controller message
const messageCtrl = require('../controllers/messages');
// Creation de la route pour la creation , en lui passant toujours l'authentification 
router.post('/messages/new/',auth,multer,messageCtrl.createMessage);









module.exports = router;