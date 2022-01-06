const {Genre,validate}=require("../modules/genres")
const express=require("express")
const router=express.Router();
const auth=require("../middleware/auth")
const admin=require("../middleware/admin")
const validateObjectId=require("../middleware/validateObjectId")
// const genre=[
//     {id:1,name:"action"},
//     {id:2,name:"horror"},
//     {id:3,name:"romance"}
// ]


router.get("/",async(req,res)=>{
  //throw new Error("couldnot get genres")//used to thrown error using winston
    const genre=await Genre.find().sort("name")
    res.send(genre).status(200)
    
  })
    router.get("/:id",validateObjectId,async(req,res)=>{
      
       const genre=await Genre.findById(req.params.id)
        if(!genre)
        return res.status(404).send("the genre with given id was not found")
      res.send(genre)
    })
   router.post("/",auth,async(req,res)=>{
      const {error}=validate(req.body)
        if(error)
        return res.status(400).send(error.details[0].message)
        let genre= new Genre({name:req.body.name})//id is createdautomaticaly
        genre= await genre.save()
      res.send(genre)
    })
   router.put("/:id",async(req,res)=>{
    const {error}=validate(req.body)
      if(error)
      return res.status(400).send(error.details[0].message) 
    const genre=await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
        if(!genre)
        return res.status(404).send("the genre with given id was not found")
      res.send(genre)
    })
   router.delete("/:id",[auth,admin],async(req,res)=>{
      const genre= await Genre.findByIdAndRemove(req.params.id)
        if(!genre)
        return res.status(404).send("the genre with given id is not found")
       res.send(genre)
    })
    
    module.exports=router;