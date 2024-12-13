const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    relationshipType: {
        type: String,
        enum: ['self', 'son','daughter', 'brother','sister', 'relative/friend', 'client-marriage-bureau'],
        required: true,
        default: 'self', 
      },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
      },
    email: {
        type: String,
        required: true, 
        unique: true,
        trim:true,
        index:true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email address']       
     }, 
    mobile: {
       type: String,
       required: true,
       unique: true,
       match: [/^\d{10}$/, 'Mobile number must be 10 digits'],
      }, 
       password: {
       type: String,
       required: true,
       minlength: 8,
       trim:true,
       select:false
     },            
    },
   {
    timestamps:true
   }
)
   userSchema.statics.hashPassword = async function (password) {
     return await bcrypt.hash(password, 10);
   }

   userSchema.methods.comparePassword = async function(password){
     return await bcrypt.compare(password,this.password)
   }
    userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id},process.env.JWT_SECRET, { expiresIn: '15d' });
    return token;
  }
  
const userModel = mongoose.model("User",userSchema);


module.exports=userModel;
