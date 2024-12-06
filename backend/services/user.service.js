const userModel = require('../models/user.model');
   
  const createUser = async ({
    email, password, mobile,gender,relationshipType
  })=>  { 
    if(!email||!password||!mobile||!gender||!relationshipType){
           throw new Error('all fields are required')
    }
    const user  = userModel.create({
        email,
         password,
          mobile,
          gender,
          relationshipType
       
    })
    return user;

}





    module.exports = {createUser}