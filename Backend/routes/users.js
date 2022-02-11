// ------------------------------------------------------------Les routes necessaires a notre utilisateur-------------------------------------------------


const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const password = require('../middleware/password');




const userCtrl = require('../controllers/users');
// Creation de la route pour s'inscrire en passant d'abord par le middleware password pour s'assurer de la force du mot de passe choisi puis si ok on passe la suite
router.post('/signup',password, userCtrl.signup);

// Creation de la route pour se connecter 
router.post('/login', userCtrl.login);

router.get('/profiles/:id',auth,userCtrl.getProfile);
router.put('/profiles/:id',auth, multer, userCtrl.updateProfile);
router.delete('/profiles/:id', auth, multer, userCtrl.deleteProfile);

module.exports = router;