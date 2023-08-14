const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_key = process.env.JWT_secret_key;


const auth = (req,res,next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).send({"message":"Access Denied"})
    }

    try {
       const decoded = jwt.verify(token, `${jwt_key}`)
       req.user = decoded.user
       next();
    } catch (error) {
        console.log(error)
        res.status(401).json({"Error":"Invalid Token"})
    }
}

module.exports = {auth}