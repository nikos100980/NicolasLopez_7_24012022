const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.RANDOM_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.send(200).json("no token");
        } else {
            
          res.status(200).json(decodedToken.id);
        
        }
      }
    );
  } else {
    console.log("No token");
  }
};
