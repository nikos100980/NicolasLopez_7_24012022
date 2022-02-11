// importation des modules necessaires

const models = require('../models');
const cookies = require('../middleware/authmessage');
const fs = require('fs');


// Ajout du module pour la creation d'un message

exports.createMessage = async (req,res,next)=>{
    const userId = cookies.getUserId(req);
    let imageUrl;
    try {
        const userFound = await models.User.findOne({
            attributes: ['firstname','lastname','picture'],
            where:{ id: userId},
        });
        if(userFound){
            if (req.file){
                imageUrl = `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                  }`;
            }else{
                imageUrl = null;
            }
            const message = await models.Message.create({
                content: content,
                
            })
        }
    } catch (error) {
        
    }

};