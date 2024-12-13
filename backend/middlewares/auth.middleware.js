const bcrypt = require('bcrypt')
const  userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

module.exports.authUser= async(req,res,next)=>{
    const token = req.cookies.token||req.headers.authorization.split(' ')[ 1 ]
    
    if(!token){
        return res.status(401).json({message:'unauthorized'})
    }

    const isBlacklisted = await userModel.findOne({token:token})

    if(isBlacklisted){
        return res.status(403).json({message:'token is blacklisted'})
    }
 
       
     try{  
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decode._id)
         req.user = user
         return next();
     }catch(err){
        return res.status(400).json({message:err.message})
    }
}