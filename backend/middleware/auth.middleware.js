const jwt = require("jsonwebtoken")

const autthenticate=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]

    if(token){
        jwt.verify(token, "masai", (err, decoded) =>{
            if(decoded){
                req.body.user=decoded.userID
                next()
            } else{
                req.status(400).json({msg:"Please Login First"})
            }
          })
    }else{
        req.status(400).json({msg:"Please Login First"})
    }
}

module.exports={
    autthenticate
}