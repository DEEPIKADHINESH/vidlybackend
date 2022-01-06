const mongoose=require("mongoose")
const Joi=require("joi")
const jwt=require("jsonwebtoken")
const userSchema= new mongoose.Schema({
   name:{
       type:String,
       required:true,
       minlength:5,
       maxlength:400
   }, 
   email:{
     type:String,
     required:true,
     minlength:7,
     maxlength:255,
     unique:true
   },
   password:{
       type:String,
       required:true,
       minlength:7,
       maxlength:255
   },
   isAdmin:{
      type:Boolean,
   }
})
userSchema.methods.generateAuthToken=function(){
const token=jwt.sign({_id:this.id,isAdmin:this.isAdmin},"jwtPrivateKey")
return token;
}
const User=mongoose.model("User",userSchema)
function validateUser(user){
  const schema={
           name:Joi.string().min(5).max(50).required(),
           email:Joi.string().min(5).max(255).required().email(),
           password:Joi.string().min(5).max(255).required()
  }
   return Joi.validate(user,schema)
  }
exports.User=User
exports.validate=validateUser;