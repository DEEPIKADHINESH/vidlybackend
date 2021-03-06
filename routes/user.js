const _=require("lodash")
const bcrypt=require("bcrypt")
const {User,validate}=require("../modules/users")
const express=require("express")
const route=express.Router()
const jwt=require("jsonwebtoken")
const auth=require("../middleware/auth")
route.get("/me",auth,async(req,res)=>{
 const user= await User.findById(req.user._id).select("-password");
 res.send(user)
})
route.get("/",async(req,res)=>{
const user= await User.find()
res.send(user)
})
route.post("/",async(req,res)=>{
    const {error}=validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
   let user=await User.findOne({email:req.body.email})
   if(user) return res.status(401).send("the user isalready regisered")
    // user=new User({
    //      name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.password
    // })
    user=new User(_.pick(req.body,["name","email","password"]));
    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(user.password,salt)
  await user.save();
  const token=user.generateAuthToken();
  res.header("x-auth-token",token).send(_.pick(user,["_id","name","email"]))
})

module.exports=route;