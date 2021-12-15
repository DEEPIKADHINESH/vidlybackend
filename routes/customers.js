const mongoose=require("mongoose")
const Joi=require("Joi")
const express=require("express")
const router=express.Router()
// const customers=[
//     {id:1,name:"Customer1"},
//     {id:2,name:"Customer2"},
//     {id:3,name:"Customer3"}
// ]
const customerSchema=new mongoose.Schema({
     name:{
         type:String,
        required:true,
    minlength:5,
maxlength:50
},
     phone:
     {type:String,
    required:true,
    minlength:5,
    maxlength:50},
     isGold:
     {type:Boolean,
    default:false},

})
const Customer=mongoose. model("Customer",customerSchema)
router.get("/",async(req,res)=>{
    const result=await Customer.find().sort("name")
    res.send(result)
})
router.get("/:id",async(req,res)=>{
    const customer=await Customer.findById(req.params.id)
   
    res.send(customer)
})
router.post("/",async(req,res)=>{
  const result=validateCustomer(req.body)
  const {error}=validateCustomer(req.body)
  if(error)
      res.status(400).send(result.error.details[0].message)
      let customer=new Customer(req.body)
      customer=await customer.save()
      res.send(customer)
if(!customer){
        res.status(404).send("the customer with given id was not found")
    }
})
router.put("/:id",async (req,res)=>{
    const {error}=validateCustomer(req.body)
    if(error)
        res.status(400).send(result.error.details[0].message)
    const customer=await Customer.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
    if(!customer)
    return res.status(404).send("the customer with given id not found")
res.send(customer)
})
router.delete("/:id",async (req,res)=>{
const customer=await Customer.findByIdAndRemove(req.params.id)
if(!customer)
res.status(404).send("the customer with given id not found")
res.send(customer)
})
function validateCustomer(customer){
const schema={name:Joi.string().min(3).required()}
    return Joi.validate(customer,schema)
}
// async function createCustomer(){
// const customer=new Customer({
//     nam