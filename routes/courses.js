const express=require("express")
const router=express.Router();
const Joi=require("joi");
const mongoose = require("mongoose");
// const genre=[
//     {id:1,name:"action"},
//     {id:2,name:"horror"},
//     {id:3,name:"romance"}
// ]
const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:30,
        required:true}
  
})
const Genre=mongoose.model("Genre",genreSchema)
router.get("/",async(req,res)=>{
    const result=await Genre.find().sort("name")
  res.send(result)
    })
    router.get("/:id",async(req,res)=>{
       const genre=await Genre.findById(req.params.id)
        if(!genre)
        return res.status(404).send("the genre with given id was not found")
      res.send(genre)
    })
   router.post("/",async(req,res)=>{
      const {error}=validateGenre(req.body)
        if(error)
        return res.status(400).send(error.details[0].message)
        let genre= new Genre({name:req.body.name})//id is createdautomaticaly
        genre= await genre.save()
      res.send(genre)
    })
   router.put("/:id",async(req,res)=>{
    const {error}=validateGenre(req.body)
      if(error)
      return res.status(400).send(error.details[0].message) 
    const genre=await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
        if(!genre)
        return res.status(404).send("the genre with given id was not found")
      res.send(genre)
    })
   router.delete("/:id",async(req,res)=>{
      const genre= await Genre.findByIdAndRemove(req.params.id)
        if(!genre)
        return res.status(404).send("the genre with given id is not found")
       res.send(genre)
    })
    function validateGenre(genre){
        const schema={name:Joi.string().min(3).required()}
    
    return Joi.validate(genre,schema)
    }
    module.exports=router;