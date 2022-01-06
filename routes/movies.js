const {Movie,validate}=require("../modules/movie")
const express=require("express");
const { Genre } = require("../modules/genres");
const router=express.Router();
const auth=require("../middleware/auth");
router.get("/",async(req,res)=>{
    const movie=await Movie.find();
    res.send(movie)
})
router.get("/:id",async(req,res)=>{
  const movie=await  Movie.findById(req.params.id)
  if(!movie)
  res.status(400).send("The movie with given id is not found")
  res.send(movie)
})
router.post("/",auth,async(req,res)=>{
    const {error}=validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const genre=await Genre.findById(req.body.genreId)
    if(!genre)return res.status(404).send("the genre with given id not found") 
    let movie=new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
 })
 
movie=await  movie.save()
res.send(movie)
})
router.put("/:id",async(req,res)=>{
    const genre=await Genre.findById(req.body.genreId)
    const {error}=validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    if(!genre) return res.status(404).send("the movie with given id is not found")
 const movie=await Movie.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    },{new:true})
    if(!movie) res.status(404).send("the movie with given id not found")
    res.send(movie)
})
router.delete("/:id",async(req,res)=>{
   const movie= await Movie.findByIdAndRemove(req.params.id)
   res.send(movie)
   if(!movie) res.status(404).send("the movie with given id is not found")
   
})

module.exports=router;