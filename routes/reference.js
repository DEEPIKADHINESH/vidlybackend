const express=require("express")
const router=express.Router();
const Joi=require("joi");
const mongoose = require("mongoose");
// const genre=[
//     {id:1,name:"action"},
//     {id:2,name:"horror"},
//     {id:3,name:"romance"}
// ]
router.get("/",async(req,res)=>{
    await res.send(Genre)
     })
     router.get("/:id",async(req,res)=>{
         const genre=Genre.find(e=>e.id === parseInt(req.params.id))
         if(!genre)
         return res.status(404).send("the genre with given id was not found")
        await res.send(genre)
     })
    router.post("/",async(req,res)=>{
         const {error}=validateGenre(req.body)
         if(error)
         return res.status(400).send(error.details[0].message)
         const genre=
             {id:Genre.length+1,
             name:req.body.name}
         Genre.push(genre)
       await  res.send(genre)
     })
    router.put("/:id",async(req,res)=>{
         const genre=Genre.find(e=>e.id===parseInt(req.params.id))
         if(!genre)
         return res.status(404).send("the genre with given id was not found")
       const {error}=validateGenre(req.body)
       if(error)
       return res.status(400).send(error.details[0].message)
         genre.name=req.body.name
        await res.send(genre)
     })
    router.delete("/:id",async(req,res)=>{
         const genre=Genre.find(e=>e.id === parseInt(req.params.id))
         if(!genre)
         return res.status(404).send("the genre with given id is not found")
         const index=Genre.indexOf(genre)
         Genre.splice(index,1)
        await res.send(genre)
     })
     function validateGenre(genre){
         const schema={name:Joi.string().min(3).required()}
     
     return Joi.validate(genre,schema)
     }
     module.exports=router;