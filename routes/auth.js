const _=require("lodash")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const Joi=require("joi")
const {User}=require("../modules/users")
const express=require("express");
const config=require("config")
const auth=require("../middleware/auth")
const route=express.Router();
route.post("/",async(req,res)=>{
  const {error}=validateAuth(req.body)
  if(error) return res.status(400).send(error.details[0].message)
let user=await User.findOne({email:req.body.email})
if(!user) res.status(400).send("invalid username")
 const validPassword=await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send("Invalid password")
const token=user.generateAuthToken()
 res.send(token )
})
function validateAuth(user){
    const schema={
        password:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).required().email()   
     }
   return  Joi.validate(user,schema)
}
module.exports=route;