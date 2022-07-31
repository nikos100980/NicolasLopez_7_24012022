//--------------------------------------------------------------------------- Creation d'un middleware pour l'authentification---------------------------------------------------------

// Importation du module JSONWEBTOKEN pour la mise en place de la gestion d'authentification par TOKEN
const jwt = require("jsonwebtoken");
// require("dotenv").config();
const models = require("../models");



module.exports = (req, res, next) => {
  
    const token = req.cookies.jwt;
    
    if(token){
        jwt.verify(token, process.env.RANDOM_TOKEN_SECRET, async (err, decodedToken)=>{
            if(err){
                 res.locals.user = null;
                console.log(err);
                res.cookie( 'jwt','');
                next();
            }else{
                console.log('decodedToken'+ decodedToken);
                
                let user = await models.User.findByPk(decodedToken.id);
                res.locals.user = user;
                console.log(res.locals.user);
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
    
};
