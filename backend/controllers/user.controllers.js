const userModel = require('../models/user.model.js')
const userService = require('../services/user.service')
const {validationResult} = require('express-validator')
  const registerUser = async function (req,res,next){
    console.log('Request received:', req.body); 
    const error = validationResult(req);
    if (!error.isEmpty()) {
       return res.status(400).json({ errors: error.array() });
    }
    const {email, password, mobile,gender,relationshipType}= req.body
 
    const hashedPassword = await userModel.hashPassword(password);
 
    const user = await userService.createUser({
      email,
      password: hashedPassword,
      mobile,
      gender,
      relationshipType
    })
 
    const token = user.generateAuthToken()
 
    res.status(201).json({token,user})
 
  
 
 }
 
 



module.exports = {registerUser}