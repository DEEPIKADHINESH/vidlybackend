const {Rental,validate}=require("../modules/rentals");
const express=require("express");
const router=express.Router();
const {Movie}=require("../modules/movie");
const {Customer}=require("../modules/customer");
const auth=require("../middleware/auth");
const { Router } = require("express");
const Fawn=require("fawn");
const mongoose = require("mongoose");
Fawn.init(mongoose)
// const { validate } = require("../modules/genres");
router.get("/",async(req,res)=>{
const rental=await Rental.find()
res.send(rental)
})
router.get("/:id",async(req,res)=>{
    const rental=await Rental.findById(req.params.id)
    if(!rental) return res.status(404).send("the given rental is not found")
    res.send(rental)
})
router.post("/",auth,async(req,res)=>{
    const {error}=validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
   const customer=await Customer.findById(req.body.customerId)
   if(!customer) return res.status(400).send("invalid customer")
   const movie=await Movie.findById(req.body.movieId)
   if(!movie) return res.status(404).send("invalid movie")
   if(movie.numberInStock === 0) return res.status(404).send("movie not in stock")
   let rental=new Rental({
       customer:{
           _id:customer._id,
           name:customer.name,
           phone:customer.phone,
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate,
        },
   })
  try{
      new Fawn.Task()
      .save("rentals",rental)
      .update("movies",{_id:movie._id},{$inc:{numberInStock:-1}})
        .run()
        res.send(rental)
  }
  catch(ex){
    res.status(500).send("something failed")
  }

  
})
module.exports=router;