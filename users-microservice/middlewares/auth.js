var jwt = require("jsonwebtoken");


function verifyToken(req, res, next){

    if(! req.headers.authorization){
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
          });
    }
    let token = req.headers.authorization.substring(7)
    try{
        jwt.verify(token, process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
          });
    }
    next()
}

function verifyProperty(req, res, next){

    let token = req.headers.authorization.substring(7)
    let payload = jwt.decode(token)
    if(payload.userId != req.params.id){
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
          });
    }
    next()
}

module.exports = {
    verifyToken,
    verifyProperty
  };
  