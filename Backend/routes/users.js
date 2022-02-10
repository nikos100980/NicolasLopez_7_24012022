// ------------------------------------------------------------Les routes necessaires a notre utilisateur-------------------------------------------------


const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');




const userCtrl = require('../controllers/users');
// Creation de la route pour s'inscrire en passant d'abord par le middleware password pour s'assurer de la force du mot de passe choisi puis si ok on passe la suite
router.post('/signup', userCtrl.signup);

// Creation de la route pour se connecter 
router.post('/login', userCtrl.login);

router.get('/profiles/:id',auth,userCtrl.getProfile);

module.exports = router;