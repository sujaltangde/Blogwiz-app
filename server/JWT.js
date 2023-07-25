const {sign,verify} = require('jsonwebtoken')

const secret = "hdsufhdoufhewu8f8ewfjewuf9";

const createtoken = (_id,username)=>{
    const accesstoken = sign({
        username : username,
        id : _id
    },secret)

    return accesstoken ;
} 


const authenticateToken = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json("missing token")
    }

    verify(token, secret, (err,user)=>{
        if(err){
            return res.status(403).json("Invalid token") ;
        }

        req.user = user ;
        next() ;
    })
}


module.exports = {createtoken,authenticateToken} ;