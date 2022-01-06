const mongoose=require("mongoose")
const Joi=require("Joi")
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
function validateCustomer(customer){ 
    const schema={name:Joi.string().min(3).required(),
    phone:Joi.string().min(3).required(),
    isGold:Joi.boolean()}
        return Joi.validate(customer,schema)
    }
    exports.Customer=Customer;
    exports.validate=validateCustomer;