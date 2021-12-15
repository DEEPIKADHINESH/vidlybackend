const mongoose=require("mongoose")
const Joi=require("Joi")
const express=require("express")
const router=express.Router()
const customers=[
    {id:1,name:"Customer1"},
    {id:2,name:"Customer2"},
    {id:3,name:"Customer3"}
]
router.get("/",(req,res)=>{
    res.send(customers)
})
router.get("/:id",(req,res)=>{
    const customer=customers.find((e)=>e.id===parseInt(req.params.id))
    
    if(!customer){
        res.status(404).send("the course with given id is not found")
    }
    res.send(customer)
})
router.post("/",(req,res)=>{
  const result=validateCourse(req.body)
  const {error}=validateCourse(req.body)
  if(error)
      res.status(400).send(result.error.details[0].message)
    const customer={
        id:customers.length+1,
        name:req.body.name
    }
      if(!customer){
        res.status(404).send("the customer with given id was not found")
    }
    customers.push(customer)
    res.send(customer)
    })
router.put("/:id",(req,res)=>{
    const customer=customers.find(e=>e.id === parseInt(req.params.id))
    const result=validateCourse(req.body);
    const {error}=validateCourse(req.body)
    if(error)
        res.status(400).send(result.error.details[0].message)
    customer.name=req.body.name;
    res.send(customer)
   
})
router.delete("/:id",(req,res)=>{
const customer=customers.find(e=>e.id === parseInt(req.params.id))
const index=customers.indexOf(customer)
customers.splice(index)
res.send(customer)
})
function validateCourse(course){
const schema={name:Joi.string().min(3).required()}
    return Joi.validate(course,schema)
}
module.exports=router;