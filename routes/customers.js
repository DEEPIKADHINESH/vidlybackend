const {Customer,validate}=require("../modules/customer")
const express=require("express")
const router=express.Router()
// const customers=[
//     {id:1,name:"Customer1"},
//     {id:2,name:"Customer2"},
//     {id:3,name:"Customer3"}
// ]


router.get("/",async(req,res)=>{
    const result=await Customer.find().sort("name")
    res.send(result)
})
router.get("/:id",async(req,res)=>{
    const customer=await Customer.findById(req.params.id)
   
    res.send(customer)
})
router.post("/",async(req,res)=>{
  const result=validate(req.body)
  const {error}=validate(req.body)
  if(error)
      res.status(400).send(result.error.details[0].message)
      let customer=new Customer(
          {name:req.body.name,
          phone:req.body.phone,
          isGold:req.body.isGold})
      customer=await customer.save()
      res.send(customer)
if(!customer){
        res.status(404).send("the customer with given id was not found")
    }
})
router.put("/:id",async (req,res)=>{
    const {error}=validate(req.body)
    if(error)
        res.status(400).send(result.error.details[0].message)
    const customer=await Customer.findByIdAndUpdate(req.params.id,{name:req.body.name,phone:req.body.phone,isGold:req.body.isGold},{new:true})
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

// async function createCustomer(){
// const customer=new Customer({
//     name:"Customer1",
//     phone:"12345",
//     isGold:true
// })
// const result =await customer.save();
// console.log(result)
// }
// createCustomer()

module.exports=router;